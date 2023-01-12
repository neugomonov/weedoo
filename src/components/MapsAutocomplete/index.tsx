import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import Qs from "qs";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageStyle,
  Keyboard,
  Platform,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

/** These shall be just enough 🤪 */
type Language = "en" | "ru";

type SearchType =
  | "accounting"
  | "airport"
  | "amusement_park"
  | "aquarium"
  | "art_gallery"
  | "atm"
  | "bakery"
  | "bank"
  | "bar"
  | "beauty_salon"
  | "bicycle_store"
  | "book_store"
  | "bowling_alley"
  | "bus_station"
  | "cafe"
  | "campground"
  | "car_dealer"
  | "car_rental"
  | "car_repair"
  | "car_wash"
  | "casino"
  | "cemetery"
  | "church"
  | "city_hall"
  | "clothing_store"
  | "convenience_store"
  | "courthouse"
  | "dentist"
  | "department_store"
  | "doctor"
  | "drugstore"
  | "electrician"
  | "electronics_store"
  | "embassy"
  | "fire_station"
  | "florist"
  | "funeral_home"
  | "furniture_store"
  | "gas_station"
  | "gym"
  | "hair_care"
  | "hardware_store"
  | "hindu_temple"
  | "home_goods_store"
  | "hospital"
  | "insurance_agency"
  | "jewelry_store"
  | "laundry"
  | "lawyer"
  | "library"
  | "light_rail_station"
  | "liquor_store"
  | "local_government_office"
  | "locksmith"
  | "lodging"
  | "meal_delivery"
  | "meal_takeaway"
  | "mosque"
  | "movie_rental"
  | "movie_theater"
  | "moving_company"
  | "museum"
  | "night_club"
  | "painter"
  | "park"
  | "parking"
  | "pet_store"
  | "pharmacy"
  | "physiotherapist"
  | "plumber"
  | "police"
  | "post_office"
  | "primary_school"
  | "real_estate_agency"
  | "restaurant"
  | "roofing_contractor"
  | "rv_park"
  | "school"
  | "secondary_school"
  | "shoe_store"
  | "shopping_mall"
  | "spa"
  | "stadium"
  | "storage"
  | "store"
  | "subway_station"
  | "supermarket"
  | "synagogue"
  | "taxi_stand"
  | "tourist_attraction"
  | "train_station"
  | "transit_station"
  | "travel_agency"
  | "university"
  | "veterinary_care"
  | "zoo";

type PlaceType =
  | "administrative_area_level_1"
  | "administrative_area_level_2"
  | "administrative_area_level_3"
  | "administrative_area_level_4"
  | "administrative_area_level_5"
  | "archipelago"
  | "colloquial_area"
  | "continent"
  | "country"
  | "establishment"
  | "finance"
  | "floor"
  | "food"
  | "general_contractor"
  | "geocode"
  | "health"
  | "intersection"
  | "locality"
  | "natural_feature"
  | "neighborhood"
  | "place_of_worship"
  | "plus_code"
  | "point_of_interest"
  | "political"
  | "post_box"
  | "postal_code"
  | "postal_code_prefix"
  | "postal_code_suffix"
  | "postal_town"
  | "premise"
  | "room"
  | "route"
  | "street_address"
  | "street_number"
  | "sublocality"
  | "sublocality_level_1"
  | "sublocality_level_2"
  | "sublocality_level_3"
  | "sublocality_level_4"
  | "sublocality_level_5"
  | "subpremise"
  | "town_square";

type AutocompleteRequestType =
  | "(regions)"
  | "(cities)"
  | "geocode"
  | "address"
  | "establishment";

interface DescriptionRow {
  description: string;
  id: string;
  matched_substrings: MatchedSubString[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: PlaceType[];
}

interface MatchedSubString {
  length: number;
  offset: number;
}

interface Term {
  offset: number;
  value: string;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: object[][];
  secondary_text: string;
  secondary_text_matched_substrings: object[][];
  terms: Term[];
  types: PlaceType[];
}

interface GooglePlaceData {
  description: string;
  id: string;
  matched_substrings: MatchedSubString[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
}

interface Point {
  lat: number;
  lng: number;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: PlaceType[];
}

interface Geometry {
  location: Point;
  viewport: {
    northeast: Point;
    southwest: Point;
  };
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface GooglePlaceDetail {
  address_components: AddressComponent[];
  adr_address: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  id: string;
  name: string;
  place_id: string;
  plus_code: PlusCode;
  reference: string;
  scope: "GOOGLE";
  types: PlaceType[];
  url: string;
  utc_offset: number;
  vicinity: string;
}

interface Query<T = AutocompleteRequestType> {
  key: string;
  sessiontoken?: string;
  offset?: number;
  location?: string;
  radius?: number;
  language?: Language;
  components?: string;
  rankby?: string;
  type?: T;
  strictbounds?: boolean;
  types?: T;
}

interface Styles {
  container: StyleProp<ViewStyle>;
  description: StyleProp<TextStyle>;
  textInputContainer: StyleProp<ViewStyle>;
  textInput: StyleProp<TextStyle>;
  loader: StyleProp<ViewStyle>;
  listView: StyleProp<ViewStyle>;
  predefinedPlacesDescription: StyleProp<TextStyle>;
  poweredContainer: StyleProp<ViewStyle>;
  powered: StyleProp<ImageStyle>;
  separator: StyleProp<ViewStyle>;
  row: StyleProp<ViewStyle>;
}

interface Place {
  description: string;
  geometry: { location: Point };
}

interface RequestUrl {
  url: string;
  useOnPlatform: "web" | "all";
  headers?: Record<string, string>;
}

interface MapsAutocompleteProps {
  debounce?: number;
  enableHighAccuracyLocation?: boolean;
  enablePoweredByContainer?: boolean;
  fetchDetails?: boolean;
  filterReverseGeocodingByTypes?: PlaceType[];
  GooglePlacesDetailsQuery?: Partial<Query> & { fields?: string };
  GooglePlacesSearchQuery?: Partial<Query<SearchType>>;
  GoogleReverseGeocodingQuery?: {
    bounds?: number;
    language?: Language;
    region?: string;
    components?: string;
  };
  inbetweenCompo?: React.ReactNode;
  isRowScrollable?: boolean;
  keyboardShouldPersistTaps?: "never" | "always" | "handled";
  listEmptyComponent?: JSX.Element | React.ComponentType<undefined>;
  listUnderlayColor?: string;
  listViewDisplayed?: "auto" | boolean;
  minLength?: number;
  keepResultsAfterBlur?: boolean;
  nearbyPlacesAPI?: "GoogleReverseGeocoding" | "GooglePlacesSearch";
  numberOfLines?: number;
  onFail?: (error?: any) => void;
  onNotFound?: () => void;
  onPress?: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void;
  onTimeout?: () => void;
  placeholder: string;
  predefinedPlaces?: Place[];
  predefinedPlacesAlwaysVisible?: boolean;
  preProcess?: (text: string) => string;
  query: Query | object;
  renderDescription?: (description: DescriptionRow) => string;
  renderHeaderComponent?: () => JSX.Element | React.ComponentType<undefined>;
  renderLeftButton?: () => JSX.Element | React.ComponentType<undefined>;
  renderRightButton?: () => JSX.Element | React.ComponentType<undefined>;
  renderRow?: (
    data: GooglePlaceData,
    index: number
  ) => JSX.Element | React.ComponentType<undefined>;
  requestUrl?: RequestUrl;
  styles?: Partial<Styles> | object;
  suppressDefaultStyles?: boolean;
  textInputHide?: boolean;
  textInputProps?: TextInputProps | object;
  timeout?: number;
}

export const MapsAutocomplete = React.forwardRef<MapsAutocompleteProps>(
  (props: any, ref) => {
    let _results: any[] = [];
    let _requests: any[] = [];
    const buildRowsFromResults = (results: any) => {
      let res: any = [];
      if (results.length === 0) {
        res = [
          ...props.predefinedPlaces.filter(
            (place: any) => place?.description.length
          ),
        ];
      }
      res = res.map((place: any) => ({
        ...place,
        isPredefinedPlace: true,
      }));
      return [...res, ...results];
    };
    const getRequestUrl = (requestUrl: any) => {
      if (requestUrl) {
        if (requestUrl.useOnPlatform === "all") {
          return requestUrl.url;
        }
        if (requestUrl.useOnPlatform === "web") {
          return Platform.select({
            web: requestUrl.url,
            default: "https://maps.googleapis.com/maps/api",
          });
        }
      } else {
        return "https://maps.googleapis.com/maps/api";
      }
    };
    const getRequestHeaders = (requestUrl: any) => {
      return requestUrl?.headers || {};
    };
    const setRequestHeaders = (request: any, headers: any) => {
      Object.keys(headers).map((headerKey) =>
        request.setRequestHeader(headerKey, headers[headerKey])
      );
    };
    const [stateText, setStateText] = useState("");
    const [dataSource, setDataSource] = useState(buildRowsFromResults([]));
    const [listViewDisplayed, setListViewDisplayed] = useState(
      props.listViewDisplayed === "auto" ? false : props.listViewDisplayed
    );
    const [url] = useState(getRequestUrl(props.requestUrl));
    const inputRef = useRef<any>();
    useEffect(() => {
      _handleChangeText(stateText);
      return () => {
        _abortRequests();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      setDataSource(buildRowsFromResults([]));
    }, [props.predefinedPlaces]);
    // @ts-expect-error - Type '{ setAddressText: (address: any) => void; getAddressText: () => string; blur: () => any; focus: () => any; isFocused: () => any; clear: () => any; }' is missing the following properties from type 'MapsAutocompleteProps': placeholder, queryts(2739) index.d.ts(1071, 79): The expected type comes from the return type of this signature.
    useImperativeHandle(ref, () => ({
      setAddressText: (address: any) => {
        setStateText(address);
        _handleChangeText(address);
        setListViewDisplayed(true);
      },
      getAddressText: () => stateText,
      blur: () => inputRef?.current?.blur(),
      focus: () => inputRef?.current?.focus(),
      isFocused: () => inputRef?.current?.isFocused(),
      clear: () => inputRef?.current?.clear(),
    }));
    const requestShouldUseWithCredentials = () =>
      url === "https://maps.googleapis.com/maps/api";
    const _abortRequests = () => {
      _requests.map((i) => i.abort());
      _requests = [];
    };
    const supportedPlatform = () => {
      if (Platform.OS === "web" && !props.requestUrl) {
        console.warn(
          "This library cannot be used for the web unless you specify the requestUrl prop. See https://git.io/JflFv for more for details."
        );
        return false;
      } else {
        return true;
      }
    };
    const _onPress = (rowData: any) => {
      if (rowData.isPredefinedPlace !== true && props.fetchDetails === true) {
        if (rowData.isLoading === true) {
          return;
        }
        Keyboard.dismiss();
        _abortRequests();
        _enableRowLoader(rowData);
        const request = new XMLHttpRequest();
        _requests.push(request);
        request.timeout = props.timeout;
        request.ontimeout = props.onTimeout;
        request.onreadystatechange = () => {
          if (request.readyState !== 4) return;
          if (request.status === 200) {
            const responseJSON = JSON.parse(request.responseText);
            if (responseJSON.status === "OK") {
              const details = responseJSON.result;
              _disableRowLoaders();
              _onBlur(null);
              setStateText(_renderDescription(rowData));
              delete rowData.isLoading;
              props.onPress(rowData, details);
            } else {
              _disableRowLoaders();
              if (!props.onNotFound) {
                console.warn("maps autocomplete: " + responseJSON.status);
              } else {
                props.onNotFound(responseJSON);
              }
            }
          } else {
            _disableRowLoaders();
            if (!props.onFail) {
              console.warn(
                "maps autocomplete: request could not be completed or has been aborted"
              );
            } else {
              props.onFail(
                "request could not be completed or has been aborted"
              );
            }
          }
        };
        request.open(
          "GET",
          `${url}/place/details/json?` +
            Qs.stringify({
              key: props.query.key,
              placeid: rowData.place_id,
              language: props.query.language,
              ...props.GooglePlacesDetailsQuery,
            })
        );
        request.withCredentials = requestShouldUseWithCredentials();
        setRequestHeaders(request, getRequestHeaders(props.requestUrl));
        request.send();
      } else if (rowData.isCurrentLocation === true) {
        _enableRowLoader(rowData);
        setStateText(_renderDescription(rowData));
        delete rowData.isLoading;
      } else {
        setStateText(_renderDescription(rowData));
        _onBlur(null);
        delete rowData.isLoading;
        const predefinedPlace = _getPredefinedPlace(rowData);
        props.onPress(predefinedPlace, predefinedPlace);
      }
    };
    const _enableRowLoader = (rowData: any) => {
      const rows = buildRowsFromResults(_results);
      for (let i = 0; i < rows.length; i++) {
        if (
          rows[i].place_id === rowData.place_id ||
          (rows[i].isCurrentLocation === true &&
            rowData.isCurrentLocation === true)
        ) {
          rows[i].isLoading = true;
          setDataSource(rows);
          break;
        }
      }
    };
    const _disableRowLoaders = () => {
      for (let i = 0; i < _results.length; i++) {
        if (_results[i].isLoading === true) {
          _results[i].isLoading = false;
        }
      }
      setDataSource(buildRowsFromResults(_results));
    };
    const _getPredefinedPlace = (rowData: any) => {
      if (rowData.isPredefinedPlace !== true) {
        return rowData;
      }
      for (let i = 0; i < props.predefinedPlaces.length; i++) {
        if (props.predefinedPlaces[i].description === rowData.description) {
          return props.predefinedPlaces[i];
        }
      }
      return rowData;
    };
    const _filterResultsByTypes = (unfilteredResults: any, types: any) => {
      if (types.length === 0) return unfilteredResults;
      const results: string[] = [];
      for (let i = 0; i < unfilteredResults.length; i++) {
        let found = false;
        for (let j = 0; j < types.length; j++) {
          if (unfilteredResults[i].types.indexOf(types[j]) !== -1) {
            found = true;
            break;
          }
        }
        if (found === true) {
          results.push(unfilteredResults[i]);
        }
      }
      return results;
    };
    const _request = (text: string) => {
      _abortRequests();
      if (supportedPlatform() && text && text.length >= props.minLength) {
        const request = new XMLHttpRequest();
        _requests.push(request);
        request.timeout = props.timeout;
        request.ontimeout = props.onTimeout;
        request.onreadystatechange = () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            const responseJSON = JSON.parse(request.responseText);
            if (typeof responseJSON.predictions !== "undefined") {
              const results =
                props.nearbyPlacesAPI === "GoogleReverseGeocoding"
                  ? _filterResultsByTypes(
                      responseJSON.predictions,
                      props.filterReverseGeocodingByTypes
                    )
                  : responseJSON.predictions;
              _results = results;
              setDataSource(buildRowsFromResults(results));
            }
            if (typeof responseJSON.error_message !== "undefined") {
              if (!props.onFail)
                console.warn(
                  "maps autocomplete: " + responseJSON.error_message
                );
              else {
                props.onFail(responseJSON.error_message);
              }
            }
          }
        };
        if (props.preProcess) {
          setStateText(props.preProcess(text));
        }
        request.open(
          "GET",
          `${url}/place/autocomplete/json?input=` +
            encodeURIComponent(text) +
            "&" +
            Qs.stringify(props.query)
        );
        request.withCredentials = requestShouldUseWithCredentials();
        setRequestHeaders(request, getRequestHeaders(props.requestUrl));
        request.send();
      } else {
        _results = [];
        setDataSource(buildRowsFromResults([]));
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceData = useMemo(
      () => debounce(_request, props.debounce),
      [props.query]
    );
    const _onChangeText = (text: string) => {
      setStateText(text);
      debounceData(text);
    };
    const _handleChangeText = (text: string) => {
      _onChangeText(text);
      const onChangeText = props?.textInputProps?.onChangeText;
      if (onChangeText) {
        onChangeText(text);
      }
    };
    const _getRowLoader = () => {
      return <ActivityIndicator animating={true} size="small" />;
    };
    const _renderRowData = (rowData: any, index: number) => {
      if (props.renderRow) {
        return props.renderRow(rowData, index);
      }
      return (
        <Text
          style={[
            {},
            props.styles.description,
            rowData.isPredefinedPlace
              ? props.styles.predefinedPlacesDescription
              : {},
          ]}
          numberOfLines={props.numberOfLines}
        >
          {_renderDescription(rowData)}
        </Text>
      );
    };
    const _renderDescription = (rowData: any) => {
      if (props.renderDescription) {
        return props.renderDescription(rowData);
      }
      return rowData.description || rowData.formatted_address || rowData.name;
    };
    const _renderLoader = (rowData: any) => {
      if (rowData.isLoading === true) {
        return <View style={[{}, props.styles.loader]}>{_getRowLoader()}</View>;
      }
      return null;
    };
    const _renderRow = (rowData = {}, index: number) => {
      return (
        <ScrollView
          contentContainerStyle={
            props.isRowScrollable ? { minWidth: "100%" } : { width: "100%" }
          }
          scrollEnabled={props.isRowScrollable}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableHighlight
            style={
              props.isRowScrollable ? { minWidth: "100%" } : { width: "100%" }
            }
            onPress={() => _onPress(rowData)}
            underlayColor={props.listUnderlayColor || "#c8c7cc"}
          >
            <View
              style={[
                {},
                props.styles.row,
                (rowData as Record<string, any>).isPredefinedPlace
                  ? props.styles.specialItemRow
                  : {},
              ]}
            >
              {_renderLoader(rowData)}
              {_renderRowData(rowData, index)}
            </View>
          </TouchableHighlight>
        </ScrollView>
      );
    };
    const _renderSeparator = (sectionID: number, rowID: number) => {
      if (rowID === dataSource.length - 1) {
        return null;
      }
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={[{}, props.styles.separator]}
        />
      );
    };
    const isNewFocusInAutocompleteResultList = ({
      relatedTarget,
      currentTarget,
    }: {
      relatedTarget: any;
      currentTarget: any;
    }) => {
      if (!relatedTarget) return false;
      let node = relatedTarget.parentNode;
      while (node) {
        if (node.id === "result-list-id") return true;
        node = node.parentNode;
      }
      return false;
    };
    const _onBlur = (e: any) => {
      if (e && isNewFocusInAutocompleteResultList(e)) return;
      if (!props.keepResultsAfterBlur) {
        setListViewDisplayed(false);
      }
      inputRef?.current?.blur();
    };
    const _onFocus = () => setListViewDisplayed(true);
    const _renderLeftButton = () => {
      if (props.renderLeftButton) {
        return props.renderLeftButton();
      }
    };
    const _renderRightButton = () => {
      if (props.renderRightButton) {
        return props.renderRightButton();
      }
    };
    const _getFlatList = () => {
      const keyGenerator = () => Math.random().toString(36).substr(2, 10);
      if (
        supportedPlatform() &&
        (stateText !== "" || props.predefinedPlaces.length > 0) &&
        listViewDisplayed === true
      ) {
        return (
          <FlatList
            nativeID="result-list-id"
            scrollEnabled={true}
            style={[{}, props.styles.listView]}
            data={dataSource}
            keyExtractor={keyGenerator}
            extraData={[dataSource, props]}
            ItemSeparatorComponent={_renderSeparator}
            renderItem={({ item, index }) => _renderRow(item, index)}
            ListEmptyComponent={
              stateText.length > props.minLength && props.listEmptyComponent
            }
            ListHeaderComponent={
              props.renderHeaderComponent &&
              props.renderHeaderComponent(stateText)
            }
            {...props}
          />
        );
      }
      return null;
    };
    const {
      onFocus,
      onBlur,
      onChangeText,
      clearButtonMode,
      InputComp,
      ...userProps
    } = props.textInputProps;
    const TextInputComp = InputComp || TextInput;
    return (
      <View style={[{}, props.styles.container]} pointerEvents="box-none">
        {!props.textInputHide && (
          <View style={[{}, props.styles.textInputContainer]}>
            {_renderLeftButton()}
            <TextInputComp
              ref={inputRef}
              style={[{}, props.styles.textInput]}
              value={stateText}
              placeholder={props.placeholder}
              onFocus={
                onFocus
                  ? (e: any) => {
                      _onFocus();
                      onFocus(e);
                    }
                  : _onFocus
              }
              onBlur={
                onBlur
                  ? (e: any) => {
                      _onBlur(e);
                      onBlur(e);
                    }
                  : _onBlur
              }
              clearButtonMode={clearButtonMode || "while-editing"}
              onChangeText={_handleChangeText}
              {...userProps}
            />
            {_renderRightButton()}
          </View>
        )}
        {props.inbetweenCompo}
        {_getFlatList()}
        {props.children}
      </View>
    );
  }
);

MapsAutocomplete.defaultProps = {
  // @ts-expect-error - Type '{ debounce: number; enableHighAccuracyLocation: boolean; fetchDetails: boolean; filterReverseGeocodingByTypes: never[]; GooglePlacesDetailsQuery: {}; GooglePlacesSearchQuery: { rankby: string; type: string; }; ... 19 more ...; timeout: number; }' is not assignable to type 'Partial<RefAttributes<MapsAutocompleteProps>>'.   Object literal may only specify known properties, and 'debounce' does not exist in type 'Partial<RefAttributes<MapsAutocompleteProps>>'.ts(2322)
  debounce: 0,
  enableHighAccuracyLocation: true,
  fetchDetails: false,
  filterReverseGeocodingByTypes: [],
  GooglePlacesDetailsQuery: {},
  GooglePlacesSearchQuery: {
    rankby: "distance",
    type: "restaurant",
  },
  GoogleReverseGeocodingQuery: {},
  isRowScrollable: true,
  keyboardShouldPersistTaps: "always",
  listUnderlayColor: "#c8c7cc",
  listViewDisplayed: "auto",
  keepResultsAfterBlur: false,
  minLength: 0,
  nearbyPlacesAPI: "GooglePlacesSearch",
  numberOfLines: 1,
  onFail: () => undefined,
  onNotFound: () => undefined,
  onPress: () => undefined,
  onTimeout: () => console.warn("maps autocomplete: request timeout"),
  placeholder: "",
  predefinedPlaces: [],
  query: {
    key: "missing api key",
    language: "en",
    types: "geocode",
  },
  styles: {},
  textInputHide: false,
  textInputProps: {},
  timeout: 20000,
};

MapsAutocomplete.propTypes = {
  // @ts-expect-error - Type '{ debounce: PropTypes.Requireable<number>; enableHighAccuracyLocation: PropTypes.Requireable<boolean>; fetchDetails: PropTypes.Requireable<boolean>; ... 31 more ...; timeout: PropTypes.Requireable<...>; }' is not assignable to type 'WeakValidationMap<RefAttributes<MapsAutocompleteProps>>'.   Object literal may only specify known properties, and 'debounce' does not exist in type 'WeakValidationMap<RefAttributes<MapsAutocompleteProps>>'.ts(2322)   No quick fixes available
  debounce: PropTypes.number,
  children: PropTypes.node.isRequired,
  enableHighAccuracyLocation: PropTypes.bool,
  fetchDetails: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  GooglePlacesDetailsQuery: PropTypes.object,
  GooglePlacesSearchQuery: PropTypes.object,
  GoogleReverseGeocodingQuery: PropTypes.object,
  inbetweenCompo: PropTypes.object,
  isRowScrollable: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.oneOf(["never", "always", "handled"]),
  listEmptyComponent: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  listViewDisplayed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["auto"]),
  ]),
  keepResultsAfterBlur: PropTypes.bool,
  minLength: PropTypes.number,
  nearbyPlacesAPI: PropTypes.string,
  numberOfLines: PropTypes.number,
  onFail: PropTypes.func,
  onNotFound: PropTypes.func,
  onPress: PropTypes.func,
  onTimeout: PropTypes.func,
  placeholder: PropTypes.string,
  predefinedPlaces: PropTypes.array,
  preProcess: PropTypes.func,
  query: PropTypes.object,
  renderDescription: PropTypes.func,
  renderHeaderComponent: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  renderRow: PropTypes.func,
  requestUrl: PropTypes.shape({
    url: PropTypes.string,
    useOnPlatform: PropTypes.oneOf(["web", "all"]),
    headers: PropTypes.objectOf(PropTypes.string),
  }),
  styles: PropTypes.object,
  textInputHide: PropTypes.bool,
  textInputProps: PropTypes.object,
  timeout: PropTypes.number,
};

MapsAutocomplete.displayName = "MapsAutocomplete";

export default { MapsAutocomplete };
