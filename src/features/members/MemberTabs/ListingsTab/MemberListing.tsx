export function MemberListing({ listingId }: { listingId: string }) {

    return(<div>Listing #: {listingId || 'No listingId'}</div>)
}