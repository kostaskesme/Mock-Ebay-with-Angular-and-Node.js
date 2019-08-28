export interface Auction {
    id: string,
    name: string,
    category: string[]
    currently: number,
    buyPrice: number,
    firstbid: number,
    numberOfBids: number,
    bids: [{
      bidder: {
        username: string,
        rating: number,
        id: string,
        location: string,
        country: string
      },
      time: Date,
      amount: number
    }],
    location: string,
    country: string,
    started: Date,
    ends: Date,
    seller: {
      username: string,
      rating: number
      id: string
    },
    description: string
}
