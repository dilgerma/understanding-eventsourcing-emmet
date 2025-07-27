import CartViewComponent from '../screens/cartview/CartViewComponent';
import {Navigation} from "../components/navigation/Navigation";
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function CartView(props: any) {
        return <CartViewComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext):Promise<any> => {
    return commonGetServerSideProps(context)}