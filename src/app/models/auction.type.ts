
export interface Auction{
    id: string,
    firstBid: number,
    noOfBids: number,
    startTime: string,
    endTime?: string,
    currentBid: number,
    buyPrice: number
}