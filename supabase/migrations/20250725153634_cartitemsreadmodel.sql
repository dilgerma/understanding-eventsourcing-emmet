-- 001_create_pgmq_and_trigger.sql

-- Create the cartitems-collection table if not exists
create table if not exists public."cartitems-collection"
(
    _id
    text
    not
    null,
    data
    jsonb
    not
    null,
    metadata
    jsonb
    not
    null
    default
    '{}'
    :
    :
    jsonb,
    _version
    bigint
    not
    null
    default
    1,
    _partition
    text
    not
    null
    default
    'png_global'
    :
    :
    text,
    _archived
    boolean
    not
    null
    default
    false,
    _created
    timestamp
    with
    time
    zone
    not
    null
    default
    now
(
),
    _updated timestamp with time zone not null default now(),
    constraint cartitems_collection_pkey primary key
(
    _id
)
    ) TABLESPACE pg_default;
