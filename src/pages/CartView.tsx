import ScreenComponent from '../screens/screen/ScreenComponent';
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function CartView(props: any) {
    return <ScreenComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<any> => {
    return commonGetServerSideProps(context)
}