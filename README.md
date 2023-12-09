# NFT Fetcher Template

This is a template for an NFT Fetcher built with Next.js and TypeScript. It allows users to explore NFTs from a specific contract on the Ethereum network.

## Features

- Fetch and display NFTs from a specific contract
- Filter NFTs by their attributes
- Clear search filters

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Usage

The main component is `Contract`. It fetches NFTs from a contract and displays them in a grid. Users can filter NFTs by their attributes using the `Filter` component.

The `Contract` component uses several hooks from `@thirdweb-dev/react`:

- `useAddress`: Fetches the current Ethereum address
- `useChain`: Fetches the current chain information
- `useRouter`: Used to get the contract address from the URL

The `Contract` component also uses several state variables to manage the application state:

- `NFTs`: An array of NFTs fetched from the contract
- `loading`: A boolean indicating whether the NFTs are being fetched
- `network`: The current network (default is 'ethereum')
- `isProcessing`: A boolean indicating whether the application is processing a request
- `atBottom`: A boolean indicating whether the user has scrolled to the bottom of the page
- `attributes`: An object mapping attribute names to arrays of their values
- `searchCleared`: A boolean indicating whether the search filters have been cleared

The `Contract` component fetches NFTs in the `useEffect` hook. It uses the `getMixtapeNFTs` function from `nft-fetcher` to fetch NFTs from the contract.

The `Contract` component also provides several handlers for user interactions:

- `handleAttributeFromCard`: Fetches NFTs with a specific attribute when the user clicks on an attribute in an NFT card
- `handleClearSearch`: Clears the search filters when the user clicks on the reset button
- `handleSelection`: Fetches NFTs with a specific attribute when the user selects an attribute from the dropdown menu


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Template Information

This template was created using [thirdweb](https://thirdweb.com) and [Next.js](https://nextjs.org/).

The template was initialized with and then modified to work with nft-fethcher:
```bash
npx thirdweb create --template next-typescript-starter
```

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

## Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Templates](https://thirdweb.com/templates)

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join thirdwebs Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
