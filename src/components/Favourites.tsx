
type ButtonProps = {
    favourites: string[]
    setCity: React.Dispatch<React.SetStateAction<string>>
}

export default function Favourites({favourites, setCity}: ButtonProps) {
    return(
        <ul className="flex space-x-4"> {/* Flex to arrange horizontally, space between items */}
        {favourites.map(fav => (
          <li key={fav}>
            <button
              onClick={() => setCity(fav)}
              className="bg-transparent rounded-lg border shadow-md py-2 px-4"
            >
              {fav}
            </button>
          </li>
        ))}
      </ul>
    );
  }
