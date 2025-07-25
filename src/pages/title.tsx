import TitleComponent from '../screens/title/TitleComponent';
import {Navigation} from "../components/navigation/Navigation";
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function Title(props: any) {
    return <TitleComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<any> => {
    return commonGetServerSideProps(context)
}