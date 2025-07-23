import TitleComponent from '../screens/title/TitleComponent';
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function ProductView(props: any) {
    return <TitleComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<any> => {
    return commonGetServerSideProps(context)
}