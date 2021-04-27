

function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 39.7392, lng: () => -104.9903 },
        radius: 2000,
      },
    });
  
    return (
      <div className="search">
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
  
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (error) {
              console.log("error!");
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter and Address"
          />
          <ComboboxPopover>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }