interface link {
    id: string,
    shortId: string,
    createdById: string,
    redirects: [{
        id: string
        url: string
        startTime: string
        endTime: string
        linkId: string
    }],
    active: boolean,
}
export default link;