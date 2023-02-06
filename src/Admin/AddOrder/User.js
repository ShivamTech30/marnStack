import React, { useEffect, useState } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import PhoneInput from 'react-phone-input-2'
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { GetAdminCloneOrder, GetAdminOrderGenerateOrderId, GetAdminOrderPaymentOrder, GetAdminOrderSummary, GetGoogleCityState, PostPincodesAvailability, PostPincodesDelivered } from "../../Redux/action/ApiCollection";

const User = () => {


  const [ordertype, setOrderType] = useState(null)
  const [pickupform, setPickupForm] = useState(null)
  const [pickupname, setPickupName] = useState('')
  const [pickupcountrycode, setPickupCountryCode] = useState("");
  const [pickupnumber, setPickupNumber] = useState('')
  const [pickuppincode, setPickupCode] = useState('')
  const [pickupcity, setPickupCity] = useState('')
  const [pickupstate, setPickupState] = useState('')
  const [pickupaddress, setPickupAddress] = useState('')
  const [delivername, setDeliverName] = useState('')
  const [delivercountrycode, setDeliverCountryCode] = useState("");
  const [delivernumber, setDeliverNumber] = useState('')
  const [deliverpincode, setDeliverPincode] = useState('')
  const [delivercity, setDeliverCity] = useState('')
  const [deliverstate, setDeliverState] = useState('')
  const [deliveraddress, setDeliveryAddress] = useState('')

  const [pickuppincodeactive, setPickUpPinCodeActive] = useState(false)
  const [pickupaddressactive, setPickupAddressActive] = useState(false)
  const [deliverpincodeactive, setDeliverPinCodeActive] = useState(false)
  const [deliveraddressactive, setDeliverAddressActive] = useState(false)

  const [addamount, setAddAmount] = useState("")

  const [addamountfieldopenclose, setAddAmountFieldOpenClose] = useState("")


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const GetAdminOrderGenerateOrderIdData = useSelector(state => state.GetAdminOrderGenerateOrderIdReducer.GetAdminOrderGenerateOrderIdData?.data)
  const PostPincodesDeliveredReducer = useSelector(state => state.PostPincodesDeliveredReducer.PostPincodesDeliveredData)
  const GetAdminOrderPaymentOrderData = useSelector(state => state.GetAdminOrderPaymentOrderReducer.GetAdminOrderPaymentOrderData)
  const GetAdminCloneOrderData = useSelector(state => state.GetAdminCloneOrderReducer.GetAdminCloneOrderData?.data)
  const PostPincodesAvailabilityReducer = useSelector(state => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData?.data)

  const GetGoogleCityStateDataReducer = useSelector(state => state.GetGoogleCityStateReducer?.GetGoogleCityStateData)

  // .data?.results;
  console.log("jhdgghdh", GetGoogleCityStateDataReducer)

  useEffect(() => {

    var parsedLocalities = [];
    if (GetGoogleCityStateDataReducer.length) {
      for (var i = 0; i < GetGoogleCityStateDataReducer.length; i++) {
        var result = GetGoogleCityStateDataReducer[i];

        var locality = {};
        for (var j = 0; j < result.address_components.length; j++) {
          var types = result.address_components[j].types;
          for (var k = 0; k < types.length; k++) {
            if (types[k] == 'locality') {
              locality.city = result.address_components[j].long_name;
            } else if (types[k] == 'administrative_area_level_1') {
              locality.state = result.address_components[j].short_name;
            }
          }
        }
        parsedLocalities.push(locality);
      }
    }
console.log("parsedLocalities1212",parsedLocalities)

    }, [GetGoogleCityStateDataReducer])


  const GenerateFun = (e) => {
    dispatch(GetAdminOrderGenerateOrderId())
  }

  const PickUpPincodeFun = (e) => {

    if (e.target.value.length == 7) return false;
    setPickupCode(e.target.value)

    let payload = {
      "pincode": e.target.value,
      "check_type": "PICKUP"
    }
    PickupAddressFun()
    if (e.target.value.length === 6) {
      // dispatch(PostPincodesDelivered(payload))
      dispatch(GetGoogleCityState(e.target.value))
      dispatch(PostPincodesAvailability(payload))
    }
    else {
      setPickUpPinCodeActive(true)
    }
  }

  const DeliverpincodeFun = (e) => {
    if (e.target.value.length == 7) return false;
    setDeliverPincode(e.target.value)
    let payload = {
      "pincode": e.target.value,
      "check_type": "DELIVERED"
    }
    DeliverAddressFun()
    if (e.target.value.length === 6) {
      // dispatch(PostPincodesDelivered(payload))
      dispatch(GetGoogleCityState(e.target.value))
      dispatch(PostPincodesAvailability(payload))
    }
    else {
      setDeliverPinCodeActive(true)
    }
  }

  useEffect(() => {
    let BearerToken = reactLocalStorage.get("token", false);
    if (!BearerToken) {
      navigate("/login");
    } else {
      navigate("#pending");
    }

    if (PostPincodesAvailabilityReducer) {

      console.log("PostPincodesAvailabilityReducer11", PostPincodesAvailabilityReducer)

      if (PostPincodesAvailabilityReducer.message !== "Available") {

        console.log("PostPincodesAvailabilityReducer111")

        setOrderType(null)
      }
      else {
        setOrderType(PostPincodesAvailabilityReducer?.method)
      }


      // This if is used for open price , after selecting the cod in Order type the price filed is open 

      if (PostPincodesAvailabilityReducer.method == "COD" && PostPincodesAvailabilityReducer.message === "Available") {
        setAddAmountFieldOpenClose(true)
      }
      else {
        setAddAmountFieldOpenClose(false)
        setAddAmount("")
      }


      if (PostPincodesAvailabilityReducer?.type == "pickup") {
        if (PostPincodesAvailabilityReducer?.message !== "Pin code is not available") {
          setPickUpPinCodeActive(false)
          setPickupCity(PostPincodesAvailabilityReducer?.city)
          setPickupState(PostPincodesAvailabilityReducer?.state)

        }

        else {
          setPickupCity("")
          setPickupState("")
          setPickUpPinCodeActive(true)

        }
      }
      else if (PostPincodesAvailabilityReducer?.type === "delivered") {
        if (PostPincodesAvailabilityReducer?.message !== "Pin code is not available") {
          setDeliverPinCodeActive(false)

          setDeliverCity(PostPincodesAvailabilityReducer?.city)
          setDeliverState(PostPincodesAvailabilityReducer?.state)
        } else {
          setDeliverPinCodeActive(true)

          setDeliverCity("")
          setDeliverState("")
        }

      }

      //PostPincodesDeliveredReducer && PostPincodesDeliveredReducer == "Pincode Available" ? setDeliveryPinCodeActive(false) : setDeliveryPinCodeActive(true)
    } else {

      setOrderType(null)

    }


    GetAdminOrderGenerateOrderIdData && reactLocalStorage.set("product_order_id", GetAdminOrderGenerateOrderIdData?.product_order_id);
    if (GetAdminOrderPaymentOrderData.status == 200) {
      navigate("/admin/order/orderdetails")
    }

  }, [PostPincodesDeliveredReducer, PostPincodesAvailabilityReducer, GetAdminOrderGenerateOrderIdData, GetAdminOrderPaymentOrderData])



  const PickupAddressFun = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter) 
    setPickupAddress(address);
    if (address == undefined) {
      setPickupAddress(" ")
      setPickupAddressActive(true)
    }
    const results = await geocodeByAddress(address);
    console.log(results)
    if (results[0]?.address_components.at(-1).long_name === pickuppincode) {
      let splitData = address.split(",")
      // setPickupCity(splitData[splitData.length - 3])
      // setPickupState(splitData[splitData.length - 2])
      setPickupAddressActive(false)
    }
    else {
      setPickupAddressActive(true)
      console.log('no data availa')
      // setPickupCity(" ")
      // setPickupState(" ")
    }
  };

  const PickupCountryCodeFun = (currentValue, objectValue, eventData, eventTargetValue) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library 
    console.log(eventTargetValue);
    let data = []
    let CountryCode = eventTargetValue.split(" ")
    setPickupCountryCode(CountryCode[0])
    CountryCode.slice(1).map((items, id) => {
      console.log(items)
      data.push(items)
    })
    let myString = data.join("").replace(/\D/g, '');
    setPickupNumber(myString)

  }



  const DeliverAddressFun = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter) 
    setDeliveryAddress(address);
    console.log(address)
    if (address == undefined) {
      setDeliveryAddress(" ")
      setDeliverAddressActive(true)
    }
    const results = await geocodeByAddress(address);
    console.log(results)
    if (results[0]?.address_components.at(-1).long_name === deliverpincode) {
      let splitData = address.split(",")
      // setDeliverCity(splitData[splitData.length - 3])
      // setDeliverState(splitData[splitData.length - 2])
      setDeliverAddressActive(false)
    }
    else {
      setDeliverAddressActive(true)
      console.log('no data availa')
      // setDeliverCity(" ")
      // setDeliverState(" ")
    }

  }
  const DeliverCountryCodeFun = (currentValue, objectValue, eventData, eventTargetValue) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library 
    console.log(eventTargetValue);
    let data = []
    let CountryCode = eventTargetValue.split(" ")
    setDeliverCountryCode(CountryCode[0])
    CountryCode.slice(1).map((items, id) => {
      console.log(items)
      data.push(items)
    })
    let myString = data.join("").replace(/\D/g, '');
    setDeliverNumber(myString)

  }


  // postpaid=cod

  const BasicInformationNextBtn = () => {

    reactLocalStorage.set("PaymentMethod", ordertype);
    reactLocalStorage.set("ConsignerPinCode", pickuppincode);

    let PayloadData = {
      // "orderid": GetAdminOrderGenerateOrderIdData?.product_order_id,
      "method": ordertype,
      "delivered_name": delivername,
      "delivered_phone_number": `${delivercountrycode}-${delivernumber}`,
      "delivered_address": deliveraddress,
      "delivered_pincode": deliverpincode,
      "delivered_city": delivercity,
      "delivered_state": deliverstate,
      // "delivered_contry_code": delivercountrycode,
      "pickup_name": pickupname,
      "pickup_phone_number": `${pickupcountrycode}-${pickupnumber}`,
      "pickup_address": pickupaddress,
      "pickup_pincode": pickuppincode,
      "pickup_city": pickupcity,
      "pickup_state": pickupstate,
      // "pickup_contry_code": pickupcountrycode
      "amount": addamount

    }
    console.log(ordertype)


    // addamountfieldopenclose==true?addamount!==null:toast.warn("fill amount")&&
    delivername &&
      delivernumber.length !== 10 ? toast.warn("deliver contact number is invalid") : delivernumber
        && deliveraddress && deliverpincode && delivercity &&
        deliverstate && delivercountrycode && pickupname &&
        pickupnumber.length !== 10 ? toast.warn("pickup contact number is invalid") : pickupnumber
          && pickupaddress && pickuppincode && pickupcity && pickupstate && pickupcountrycode &&
          ordertype == null ? toast.warn("Please fill all the input fields") : ordertype ?
      dispatch(GetAdminOrderPaymentOrder(PayloadData))


      :

      toast.warn("please fill all the fields currectly")
    console.log("PayloadData", PayloadData)

  }

  useEffect(() => {
    let OrderId = reactLocalStorage.get("order_id", false);
    console.log("OrderId", OrderId)
    let objectData = {
      product_order_id: OrderId,
    };
    dispatch(GetAdminCloneOrder(objectData));

  }, [])

  useEffect(() => {

    if (GetAdminCloneOrderData) {
      setOrderType(GetAdminCloneOrderData?.method)
      setPickupName(GetAdminCloneOrderData?.consignee_details?.consignee_name)
      setPickupCountryCode(GetAdminCloneOrderData?.consignee_details?.consignee_code)
      setPickupNumber(GetAdminCloneOrderData?.consignee_details?.consignee_number)
      setPickupCode(GetAdminCloneOrderData?.consignee_details?.consignee_pincode)
      setPickupCity(GetAdminCloneOrderData?.consignee_details?.consignee_city)
      setPickupState(GetAdminCloneOrderData?.consignee_details?.consignee_state)
      setPickupAddress(GetAdminCloneOrderData?.consignee_details?.consignee_address)
      setDeliverName(GetAdminCloneOrderData?.consigner_details?.consigner_name)
      setDeliverCountryCode(GetAdminCloneOrderData?.consigner_details?.consigner_code)
      setDeliverNumber(GetAdminCloneOrderData?.consigner_details?.consigner_number)
      setDeliverPincode(GetAdminCloneOrderData?.consigner_details?.consigner_pincode)
      setDeliverCity(GetAdminCloneOrderData?.consigner_details?.consigner_city)
      setDeliverState(GetAdminCloneOrderData?.consigner_details?.consigner_state)
      setDeliveryAddress(GetAdminCloneOrderData?.consigner_details?.consigner_address)
    }



  }, [GetAdminCloneOrderData])

  const OrderType = (e) => {

    setOrderType(null)

    let payload = {
      "pincode": deliverpincode, //it will be delived
      "method": e.target.value, //after selecteing the dropdown 
      "check_type": "DELIVERED"
    }

    dispatch(PostPincodesAvailability(payload))





    // if (e.target.value == "COD") {
    //   setAddAmountFieldOpenClose(true)
    // }
    // else {
    //   setAddAmountFieldOpenClose(false)
    //   setAddAmount("")
    // }

  }




  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part`}>
        <Sidebar />
        <div className="content-sec">
          <div className="orderdetail-part">
            <ul className="user-list">
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/User");
                // }}
                className="active"
              >
                <span></span>Consignee Details
              </li>

              <li
              // onClick={(e) => {
              //   navigate("/admin/order/orderdetails");
              // }}
              >
                <span></span>Item Details
              </li>
              <li
              // onClick={(e) => {
              //   navigate("/admin/order/ordersummary");
              // }}
              >
                <span></span>Summary Details
              </li>
              <li
              // onClick={(e) => {
              //   navigate("/admin/order/orderpayment");
              // }}
              >
                <span></span>Payment
              </li>
            </ul>

            <div className="userinfo-box">
              <h1>Basic Information</h1>
              <div className="userinfo-body">
                {/* <h3>Order Details</h3> */}
                <div className="row">
                  {/* <div className="col-md-6 input_filed_block">
                    <label>Order Id</label>
                    <input
                      type="text"
                      name="generateorder"
                      className="form-control mt-1 input_filed input_filed_zIndex"
                      placeholder="Order Id"
                      // onChange={(e) => setGenerateOrder(e.target.value)}
                      value={GetAdminOrderGenerateOrderIdData?.product_order_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => GenerateFun(e)}>

                      Generate
                    </button>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Order type</label>
                    <select className='form-control mt-1'
                      onChange={(e) => setOrderType(e.target.value)}
                      value={ordertype}>
                      <option value="none" selected disabled hidden>Select Order type...</option>
                      <option value="online">postpaid</option>
                      <option value="cod">prepaid</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Pickup from</label>
                    <input
                      type="text"
                      name="pickupform"
                      className="form-control mt-1"
                      placeholder="Franchise Location"
                      onChange={(e) => setPickupForm(e.target.value)}
                      value={pickupform}
                    />
                  </div> */}



                  <h3 className="col-12  ">Consigner Information</h3>
                  <div className="row  m-0 p-0">
                    <div className="col-md-4 mt-2">
                      <label>Contact name</label>
                      <input
                        type="text"
                        name="pickupname"
                        className="form-control mt-1"
                        placeholder="Name"
                        value={pickupname}
                        onChange={(e) => setPickupName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mt-2">
                      <label>Mobile Number</label>
                      {/* <input
                        type="number"
                        name="pickupnumber"
                        className="form-control mt-1"
                        placeholder="Mobile Number"
                        value={pickupnumber}
                        onChange={(e) => setPickupNumber(e.target.value)}
                      /> */}
                      <PhoneInput
                        country={'in'}
                        value={pickupcountrycode + pickupnumber}
                        onChange={PickupCountryCodeFun}
                        className="input_filed"
                      />
                    </div>

                    <div className="col-md-4 mt-2">
                      <label>Pincode</label>
                      <input type="text" className={`form-control check-box ${pickuppincodeactive && pickuppincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                        value={pickuppincode} onChange={(e) => PickUpPincodeFun(e)} />
                      {pickuppincodeactive && pickuppincode ? <span className='text-danger '>
                        <small> Pincode is not available </small></span> : ""}
                    </div>
                  </div>

                  <div className="col-md-12 ">
                    <div className="col-12 mt-3">
                      <label>Address</label>

                      <PlacesAutocomplete
                        value={pickupaddress}
                        onChange={(e) => PickupAddressFun(e)}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div
                            className={pickupaddressactive ? "mb-4" : ""}
                          >
                            <input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                              className={`form-control `}
                            // ${pickupaddressactive ? "alert_border" : ""} 
                            />
                            <div className="autocomplete-dropdown-container">

                              {suggestions.map(suggestion => {
                                console.log(suggestion)
                                const className = suggestion.activesi
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}

                              {/* {!suggestions[0]?.description && pickupaddressactive ? <span className='text-danger mb-4 '>
                                <small> This address is not available </small></span> : setPickupAddressActive(false)} */}

                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>

                  </div>
                  <div className="row mt-3 m-0 p-0">
                    <div className="col-md-6 mt-1">
                      <label>City</label>
                      <input
                        type="text"
                        name="pickupcity"
                        className="form-control mt-1"
                        placeholder="City"
                        value={pickupcity}
                        onChange={(e) => setPickupCity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mt-1">
                      <label>State</label>
                      <input
                        type="text"
                        name="pickupstate"
                        className="form-control mt-1"
                        placeholder="State"
                        value={pickupstate}
                        onChange={(e) => setPickupState(e.target.value)}
                      />
                    </div>
                  </div>
                  <h3 className="col-12 mt-5">Consignee Information</h3>

                  <div className="col-md-4 mt-2">
                    <label>Contact name</label>
                    <input
                      type="text"
                      name="delivername"
                      className="form-control mt-1"
                      placeholder="Name"
                      value={delivername}
                      onChange={(e) => setDeliverName(e.target.value)}
                    />


                  </div>
                  <div className="col-md-4 mt-2">
                    <label>Mobile Number</label>
                    {/* <input
                      type="number"
                      name="delivernumber"
                      className="form-control mt-1"
                      placeholder="Mobile Number"
                      value={delivernumber}
                      onChange={(e) => setDeliverNumber(e.target.value)}
                    /> */}
                    <PhoneInput
                      country={'in'}
                      value={delivercountrycode + delivernumber}
                      onChange={DeliverCountryCodeFun}
                      className="input_filed"
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label>Pincode</label>

                    <input type="text" className={`form-control check-box ${deliverpincodeactive && deliverpincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                      value={deliverpincode} onChange={(e) => DeliverpincodeFun(e)} />
                    {deliverpincodeactive && deliverpincode ? <span className='text-danger '>
                      <small> Pincode is not available </small></span> : ""}

                  </div>
                  <div className="col-12 mt-3">
                    <label>Address</label>


                    <PlacesAutocomplete
                      value={deliveraddress}
                      onChange={(e) => DeliverAddressFun(e)}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div
                          className={deliveraddressactive ? "mb-4" : ""}
                        >
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                            className={`form-control `}
                          //  ${deliveraddressactive ? "alert_border" : ""}

                          />
                          <div className="autocomplete-dropdown-container">

                            {suggestions.map(suggestion => {
                              console.log(suggestion)
                              const className = suggestion.activesi
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}

                            {/* {!suggestions[0]?.description && deliveraddressactive ? <span className='text-danger mb-4 '>
                              <small> This address is not available </small></span> : setDeliverAddressActive(false)} */}

                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row">
                      <div className="col-md-6 mt-1">
                        <label>City</label>
                        <input
                          type="text"
                          name="delivercity"
                          className="form-control mt-1"
                          placeholder="City"
                          value={delivercity}
                          onChange={(e) => setDeliverCity(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mt-1">
                        <label>State</label>
                        <input
                          type="text"
                          name="deliverstate"
                          className="form-control mt-1"
                          placeholder="State"
                          value={deliverstate}
                          onChange={(e) => setDeliverState(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 pb-2">
                    <h3>Order Details</h3>
                  </div>

                  {/* <div className="col-md-6 input_filed_block">
                    <label>Order Id</label>
                    <input
                      type="text"
                      name="generateorder"
                      className="form-control mt-1 input_filed input_filed_zIndex"
                      placeholder="Order Id"
                      // onChange={(e) => setGenerateOrder(e.target.value)}
                      value={GetAdminOrderGenerateOrderIdData?.product_order_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => GenerateFun(e)}>

                      Generate
                    </button>
                  </div> */}
                  <div className="col-md-6 mt-3">
                    <label>Order type</label>
                    <select className='form-control mt-1'
                      onChange={(e) => OrderType(e)}
                      value={ordertype}>
                      <option value="none" Selected  >Select Order type...</option>
                      <option value="PREPAID">prepaid</option>
                      <option value="COD">cod</option>

                    </select>
                    {PostPincodesAvailabilityReducer && PostPincodesAvailabilityReducer.message !== "Available" ? <span className='text-danger mb-4 '>
                      <small>

                        {PostPincodesAvailabilityReducer && PostPincodesAvailabilityReducer?.message}
                      </small></span> : ""}



                  </div>
                  {/* <div className="col-md-6 mt-3">
                    <label>Pickup from</label>
                    <input
                      type="text"
                      name="pickupform"
                      className="form-control mt-1"
                      placeholder="Franchise Location"
                      onChange={(e) => setPickupForm(e.target.value)}
                      value={pickupform}
                    />
                  </div> */}
                  {addamountfieldopenclose && <div className="col-md-6   pt-3">
                    <label>Add Amount</label>
                    <input
                      type="number"
                      name="generateorder"
                      className="form-control mt-1 input_filed "
                      placeholder="Enter Amount"
                      onChange={(e) => setAddAmount(e.target.value)}
                      value={addamount}
                    />
                  </div>}
                  {/* <div className="col-md-6 pt-4">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => AddAmountFun(e)}>

                      Add Amount
                    </button>
                  </div>   */}

                </div>
              </div>
              <button
                onClick={(e) => BasicInformationNextBtn(e)}
                type="button"
                className="btn next-btn"
              >
                {" "}
                Next{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
