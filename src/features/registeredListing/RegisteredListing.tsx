import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/hooks";
import ContentContainer from "../../components/content/ContentContainer";
import RegisteredListingForm from "./RegisteredListingForm";
import {fetchRegisteredListingById, selectRegisteredListingById} from "./registeredListingSlice";
import {RootState} from "../../app/store";

const RegisteredListing = () => {
    const title = "Registered Listings";
    const dispatch = useAppDispatch();
    const [listing, setListing] = useState<any>();
    const {id} = useParams<{id: string}>();
    const existing = useSelector((state: RootState) =>
        selectRegisteredListingById(state, id)
    );

    useEffect(() => {
        if (id !== 'new') {
            // find the listing we need
            if (existing) {
                setListing(existing);
            } else {
                dispatch(fetchRegisteredListingById(id));
            }
        }
    }, [dispatch, id, existing]);

    return (
        <ContentContainer title={title} description="Listings in Registered status are excluded from the MLS per the seller’s instructions, either temporarily or for the whole term of the listing. They are not “in” the MLS. Only the listing agent, listing broker and office manager, and Association/CRMLS staff can view Registered
        listings." actions={null}>
            <RegisteredListingForm
                listing={listing}
            />
        </ContentContainer>
    );
}

export default RegisteredListing;