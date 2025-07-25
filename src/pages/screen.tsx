import ScreenComponent from '../screens/screen/ScreenComponent';
import {Navigation} from "../components/navigation/Navigation";
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function Screen(props: any) {
    return <ScreenComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<any> => {
    return commonGetServerSideProps(context)
}