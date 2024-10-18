
//react icons


//components
import BgImage from '@/app/lib/Components/BgImage'
import SearchInput from '@/app/lib/Components/SearchInput'
import CharactersRenderer from './lib/Components/CharactersRenderer';

export default function Home() {

  return (
    <div>
      {/*star wars image*/}
      <BgImage/>
      {/* search */}
      <SearchInput/>
      <CharactersRenderer/>
    </div>
  );
}
