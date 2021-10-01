import {useRouter} from "next/router";
import {useEffect} from "react";

const Details = () => {

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {

    });

    return (
        <>
            Room details {id}
        </>
    )
}

export default Details;