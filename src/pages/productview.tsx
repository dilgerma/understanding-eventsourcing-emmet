import ProductViewComponent from '../screens/productview/ProductViewComponent';
import {Navigation} from "../components/navigation/Navigation";
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function ProductView(props: any) {
        return <ProductViewComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext):Promise<any> => {
    return commonGetServerSideProps(context)}