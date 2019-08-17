export interface Auction {
    ItemID: string,
    Name: string,
    Category: string[]
    Currently: number,
    Buy_Price: number,
    First_Bid: number,
    Number_of_Bids: number,
    Bids: [{
      Bidder: {
        Rating: number,
        UserID: string,
        Location: string,
        Country: string
      },
      Time: string,
      Amount: number
    }],
    Location: string,
    Country: string,
    Started: string,
    Ends: string,
    Seller: {
      Rating: number
      UserID: string
    },
    Description: string
}
