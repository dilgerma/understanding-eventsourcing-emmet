-- 001_create_pgmq_and_trigger.sql

-- Create the cartstobepublished-collection table if not exists
create table if not exists public."cartstobepublished-collection"
(
    _id text                            not null,
    data       jsonb                    not null,
    metadata   jsonb                    not null default '{}'::jsonb,
    _version bigint                     not null default 1,
    _partition text                     not null default 'png_global'::text,
    _archived boolean                   not null default false,
    _created   timestamp with time zone not null default now(),
    _updated   timestamp with time zone not null default now(),
    constraint cartstobepublished_collection_pkey primary key (_id)
    ) TABLESPACE pg_default;

-- Enable pgmq extension if not already enabled
create extension if not exists pgmq;

-- Create the queue
select pgmq.create('cartstobepublished');

-- Create the trigger function to send updates to the queue
create or replace function public.cartstobepublished_notify_update_to_queue()
returns trigger
security definer
as $$
begin
  -- Insert a message into the queue with relevant payload
  PERFORM pgmq.send(
    'cartstobepublished',                    -- queue_name (text)
    json_build_object(                   -- msg (jsonb) - note the ::jsonb cast
      'table', TG_TABLE_NAME,
      'action', TG_OP,
      'data', case
        when TG_OP = 'DELETE' then row_to_json(OLD)
        else row_to_json(NEW)
      end
    )::jsonb,                           -- Cast to jsonb here!
    0                                   -- delay (integer, optional)
  );

  -- Return the correct row
  if TG_OP = 'DELETE' then
    return OLD;
else
    return NEW;
end if;
end;
$$
language plpgsql;

-- Drop trigger if it exists to allow re-runs of migration safely
drop trigger if exists cartstobepublished_update_queue_trigger on public."cartstobepublished-collection";

-- Create the trigger on INSERT, UPDATE, DELETE
create trigger cartstobepublished_update_queue_trigger
    after insert or update or delete
                    on public."cartstobepublished-collection"
                        for each row execute function public.cartstobepublished_notify_update_to_queue();
