import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return(
      <div
        className='group
        outline outline-0 outline-white shadow-inner
        focus-within:outline-2 w-2/5 lg:w-3/5 h-3/5 my-auto rounded-lg p-1 bg-gray-700
        flex justify-between'>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" className='text-white my-auto px-1'/>
          <input className='bg-gray-700 outline-0 text-white text-right focus-visible:outline-none w-10/12'></input>
      </div>
    )
  }

export default SearchBar