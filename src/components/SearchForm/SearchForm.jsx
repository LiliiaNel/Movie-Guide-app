import { useSearchParams } from 'react-router-dom';

export default function SearchForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const changeSearchQuery = (event) => {
        const newQuery = event.currentTarget.value;

        const nextSearchParams = new URLSearchParams(searchParams);

        if (newQuery !== "") {
            nextSearchParams.set("query", newQuery);
        } else { nextSearchParams.delete("query") };

        setSearchParams(nextSearchParams);
    };

    return (
    <div>
      <form
        onSubmit={e => e.preventDefault()}
        className="
          flex items-center gap-2.5
          px-4 py-2.5
          rounded-lg
          max-w-[400px]
          mx-auto
          mb-5
        "
      >
        <input
          type="text"
          name="movieSearch"
          value={query}
          onChange={changeSearchQuery}
          placeholder="Type to search..."
          autoComplete="off"
          className="
            grow
            px-3.5 py-2.5
            bg-transparent
            border-2 border-[#cd8e37]
            rounded-md
            text-base text-[#e3e0dc]
            placeholder:text-[#ffb347]
            transition-colors duration-300
            focus:outline-none
            focus:border-[#f97316]
            focus:shadow-[0_0_6px_rgba(255,179,71,0.4)]
          "
        />
      </form>
    </div>
  );
 }
