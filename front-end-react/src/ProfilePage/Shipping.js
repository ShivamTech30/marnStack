import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import Layout from '../Components/DashboardLayout/Layout'
import Axios from "axios";
import { toast } from "react-toastify";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import {
    getOrderAddress, PostOrderDownloadInvoiceFile, GetShipmentDetails, GetCustomerOrderDetail,
    PatchPickupAddress, PostPincodesAvailability, PostPincodesDelivered, PostShipmentDetails, ShipmentLoaderTrueFalse
} from '../Redux/action/ApiCollection';
import { useDispatch, useSelector } from 'react-redux';
import LodingSpiner from '../Components/LodingSpiner';
import Popup from "reactjs-popup";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


const Shipping = () => {

    const navigate = useNavigate();

    let BearerToken = reactLocalStorage.get("token", false);
    let Admin_Role = reactLocalStorage.get("Admin_Role", false);





    const [pickupaddress, setPickUpAddress] = useState('')
    const [deliveryaddress, setDeliveryAddress] = useState('')
    const [pickuppincode, setPickupPinCode] = useState('')
    const [pickuppincodeactive, setPickupPinCodeActive] = useState(false)
    const [deliverypincodeactive, setDeliveryPinCodeActive] = useState(false)
    const [pickuppincodeactivecheck, setPickupPinCodeActiveCheck] = useState(false)
    const [deliverypincodeactivecheck, setDeliveryPinCodeActiveCheck] = useState(false)
    const [deliveredpincode, setDeliveredPincode] = useState('')
    const [selectedproduct, setSelectedProduct] = useState('')
    const [deliveryproduct, setDeliveryProduct] = useState(null)
    const [weight, setWeight] = useState('')
    const [yesnoactivebutton, setYesNoActiveButton] = useState(true)
    const [date, setDate] = useState('')
    const [pickupname, setPickupName] = useState('')
    const [pickupcontact, setPickupContact] = useState('')
    const [pickupcity, setPickupCity] = useState('')
    const [pickupstate, setPickupState] = useState('')
    const [deliveryname, setDeliveryName] = useState('')
    const [deliverycontact, setDeliveryContact] = useState('')
    const [deliverycity, setDeliveryCity] = useState('')
    const [deliverystate, setDeliveryState] = useState('')
    const [loadspiner, setLoadSpiner] = useState(false);
    const [countrycodedelivery, setCountryCodeDelivery] = useState("");
    const [countrycodepickup, setCountryCodePickup] = useState("");
    const [pickupaddressactive, setPickupAddressActive] = useState(false)
    const [deliveryaddressactive, setDeliveryAddressActive] = useState(false)
    const [pickuppopup, setPickUpPopup] = useState(false)
    const [pickuppatchfilterdata, setPatchFilterData] = useState("")
    const [pickuppatchobjectid, setPatchObjectId] = useState(null)
    const [deliverytypeerror, setDeliveryTypeError] = useState(false)


    const dispatch = useDispatch()
    let paramHash = useLocation();

    const GetShipmentDetailsData = useSelector(state => state.GetShipmentDetailsReducer.GetShipmentDetailsData.data)
    const PostPincodesAvailabilityReducer = useSelector(state => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData?.data)
    const PostPincodesDeliveredReducer = useSelector(state => state.PostPincodesDeliveredReducer.PostPincodesDeliveredData?.data?.message)

    const PostShipmentDetailsData = useSelector(state => state.PostShipmentDetailsReducer.PostShipmentDetailsData.data?.shipment_id)
    const PostDeliveryAddressData = useSelector(state => state.PostDeliveryAddressReducer.PostDeliveryAddressData.data?.delivered_id)
    const PostPickupAddressData = useSelector(state => state.PostPickupAddressReducer.PostPickupAddressData?.data?.pickup_id)
    const PatchPickupAddressData = useSelector(state => state.PatchPickupAddressReducer.PatchPickupAddressData?.data)
    const OrderDetails = useSelector(state => state.orderDetailsReducer.orderDetails)
    const ShipmentLoaderTrueFalseData = useSelector(state => state.ShipmentLoaderTrueFalseReducer.ShipmentLoaderTrueFalseData)


    const PostOrderDownloadInvoiceFileData = useSelector(
        (state) => state.PostOrderDownloadInvoiceFileReducer.PostOrderDownloadInvoiceFileData?.data
    );


    useEffect(() => {

        if (Admin_Role) {
            if (paramHash?.pathname == "/shipping") {
                navigate("/");
            }
        }

        if (!BearerToken) {
            navigate("/login");
        } else {
            navigate("#pending");
        }

        if (PostShipmentDetailsData && PostDeliveryAddressData && PostPickupAddressData || PatchPickupAddressData) {
            let payload = {
                "pickup_id": PostPickupAddressData ? PostPickupAddressData : pickuppatchobjectid,
                "delivered_id": PostDeliveryAddressData,
                "shipment_id": PostShipmentDetailsData
            }
            console.log("mbdjkbdkj")
            dispatch(GetShipmentDetails(payload))

        }

    }, [PostShipmentDetailsData, PostDeliveryAddressData, PostPickupAddressData, PatchPickupAddressData])

    console.log(PostShipmentDetailsData, PostDeliveryAddressData, PostPickupAddressData)

    const PickupPinCodeFun = (e) => {

        if (e.target.value.length == 7) return false;
        setPickupPinCode(e.target.value)
        let payload = {
            "pincode": e.target.value,
            "check_type": "PICKUP"
        }
        if (e.target.value.length === 6) {
            dispatch(PostPincodesAvailability(payload))
            setPickupPinCodeActiveCheck(o => !o)
        }
        else {
            setPickupPinCodeActive(false)
        }
    }

    const DeliveredPincodeFun = (e) => {

        if (e.target.value.length == 7) return false;
        setDeliveredPincode(e.target.value)
        let payload = {
            "pincode": e.target.value,
            "check_type": "DELIVERED"
        }

        if (e.target.value.length === 6) {
            dispatch(PostPincodesAvailability(payload))
            setDeliveryPinCodeActiveCheck(o => !o)
        }
        else {
            setDeliveryPinCodeActive(false)
        }
    }

    const SelectDeliveryType = (e) => {
        setDeliveryProduct(e.target.value)
        let payload = {
            "pincode": pickuppincode,
            "delivery_type": e.target.value,
            "check_type": "PICKUP"
        }
        if (e.target.value) {
            dispatch(PostPincodesAvailability(payload))

        }

    }


    // UDB - Southern Heights, Sector 22, Pratap Nagar, Jaipur, Rajasthan, India
    const PickupAddressFun = async (address, id) => {
        // please don't remove the id (parameter) it's important for address (parameter)

        setPickUpAddress(address);
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


    const DeliveryAddressFun = async (address, id) => {
        // please don't remove the id (parameter) it's important for address (parameter) 

        setDeliveryAddress(address);
        const results = await geocodeByAddress(address);
        if (results[0]?.address_components.at(-1).long_name === deliveredpincode) {
            let splitData = address.split(",")
            setDeliveryCity(splitData[splitData.length - 3])
            setDeliveryState(splitData[splitData.length - 2])
            setDeliveryAddressActive(false)

        }
        else {
            setDeliveryAddressActive(true)
        }

    };





    const ConfirmDeleverFun = (e) => {
        e.preventDefault()

        let payloadPickupAddress = {
            "name": pickupname,
            "phone_number": `${countrycodepickup}-${pickupcontact}`,
            "address": pickupaddress,
            "pincode": pickuppincode,
            "city": pickupcity,
            "state": pickupstate,
            // "contry_code": countrycodepickup,
            "id": pickuppatchobjectid
        }

        let payloadDeliveredAddress = {
            "name": deliveryname,
            "phone_number": `${countrycodedelivery}-${deliverycontact}`,
            "address": deliveryaddress,
            "pincode": deliveredpincode,
            "city": deliverycity,
            "state": deliverystate,
            // "contry_code": countrycodedelivery
        }

        let payloadShipping = {
            "product_type": selectedproduct,
            "delivery_type": deliveryproduct,
            "weight": weight,
            "pickup_date": date,
            "pack_shipment": yesnoactivebutton
        }


        pickupname &&
            pickupcontact.length !== 10 ? toast.warn("pickup contact number is invalid") : pickupcontact
                && pickupaddress
                && pickuppincode && pickupcity && pickupstate
                && deliveryname &&
                deliverycontact.length !== 10 ? toast.warn("delivery contact number is invalid") : deliverycontact
                    &&
                    deliveryaddress &&
                    deliveredpincode &&
                    pickupaddressactive && deliveryaddressactive && //this is new modification and address's is not validated
                    // pickupaddressactive !== false ? toast.warn("pickup address is not available ") : " " &&
                    // deliveryaddressactive !== false ? toast.warn("delivery address is not available ") : " " &&
                    deliverycity &&
                    deliverystate &&
                    selectedproduct &&
                    deliveryproduct == "none" ? toast.warn("Please select delivery type") : deliveryproduct &&
                        weight &&
                        date ?
            dispatch(PostShipmentDetails(payloadShipping, payloadDeliveredAddress, payloadPickupAddress, pickuppatchobjectid))
            :

            toast.warn("please fill all the fields currectly")
    }

    console.log("deliveryproduct", pickuppatchobjectid)


    useEffect(() => {

         

        dispatch(getOrderAddress())
        if (PostPincodesAvailabilityReducer?.type === "pickup") {
            if (PostPincodesAvailabilityReducer?.message === "Available") {
                setPickupPinCodeActive(true)
                setDeliveryTypeError(false)
                if (pickuppatchfilterdata && pickuppatchfilterdata?.length !== 0
                    // && !pickuppincodeactive
                ) {
                    if (deliveryproduct == null || deliveryproduct == "none") {
                        setPickUpPopup(true)
                        // setPickupCity()
                        // setPickupState()
                        console.log("mnhcbkbkbvkb-true")
                    }
                    else {
                        setPickUpPopup(false)

                    }


                }
                else {
                    setPickUpPopup(false) // make address popup false 
                    setPickupCity(PostPincodesAvailabilityReducer?.city)
                    setPickupState(PostPincodesAvailabilityReducer?.state)

                    console.log("mnhcbkbkbvkb-false")
                }
                // !pickuppincodeactive && setPickUpPopup(true)


            }
            else {

                setDeliveryProduct("none")
                setDeliveryTypeError(true)
                setPickUpPopup(false)
                setPickupPinCodeActive(false)
            }
        }

        else if (PostPincodesAvailabilityReducer?.type === "delivered") {
            if (PostPincodesAvailabilityReducer?.message === "Available") {

                setDeliveryPinCodeActive(true)

                setDeliveryCity(PostPincodesAvailabilityReducer?.city)
                setDeliveryState(PostPincodesAvailabilityReducer?.state)
            }
            else {
                setDeliveryPinCodeActive(false)
                setDeliveryCity("")
                setDeliveryState("")
            }
        }




        // console.log("PostPincodesAvailabilityReducer", PostPincodesAvailabilityReducer)

    }, [pickuppincodeactivecheck, PostPincodesAvailabilityReducer, pickuppatchfilterdata])

    useEffect(() => {

        let data = OrderDetails?.data?.filter((item, id) => {
            if (item.pincode.toString() === pickuppincode) {
                return item
            }
        })
        data && setPatchFilterData(data)

    }, [pickuppincodeactivecheck, PostPincodesAvailabilityReducer])



    useEffect(() => {
        console.log("PostPincodesAvailabilityReduce12r", PostPincodesAvailabilityReducer)

        if (PostPincodesAvailabilityReducer == undefined || PostPincodesAvailabilityReducer.message == "Pin code is not available") {
            // console.log("mnbvdj")
            // setDeliveryTypeError(true)
            // setDeliveryProduct("")
            // setPickUpPopup(false)

        }
        else {
            //  setPickUpPopup(false)

            // setDeliveryTypeError(false)
            // console.log("mnbvdj1")
        }

    }, [PostPincodesAvailabilityReducer])

    const CurrentDateFun = (e) => {
        const selected = new Date(e.target.value);
        const maxDate = new Date();
        maxDate.setHours(0, 0, 0, 0);

        console.log(selected, maxDate)

        if (selected >= maxDate) {
            let spliteData = selected.toISOString().split("T")
            setDate(spliteData[0])

        }
        else {
            toast.warn("please select validDate ");
            setDate("")
        }

    }

    useEffect(() => {

    }, [GetShipmentDetailsData])

    const handlePaymentSuccess = async (response, orderId) => {
        setLoadSpiner(o => !o)

        console.log("responecget")

        console.log("sdsdsd", response, orderId)



        console.log("dfd", OrderDetails)
        // let OrderDetailsId = JSON.parse(OrderDetails);
        // let product_order_id = OrderDetailsId?.toString();
        // console.log("sssd",product_order_id)

        let InvoicePayLoad = {
            product_order_id: orderId,
            request_type: "create",
        };

        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
            console.log("responecget")

            await Axios({
                url: `${process.env.REACT_APP_BASE_URL}/payment/status`,
                method: "POST",
                data: bodyData,
                headers: {
                    Authorization: `Bearer ${BearerToken}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log("responecget")

                    console.log(res)
                    setLoadSpiner(o => !o)
                    toast.success(res.data.message)
                    dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
                    navigate("/profile")
                })
                .catch((err) => {
                    console.log("responecget")

                    console.log(err);
                });
        } catch (error) {
            console.log("responecget")

            console.log(console.error());
        }
    };

    // this will load a script tag which will open up Razorpay payment card to make //transactions
    const loadScript = () => {
        console.log("responecget")

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        console.log("responecget")

        document.body.appendChild(script);
    };

    const PaymentFun = async (e, amount) => {
        const res = await loadScript();
        console.log("responecget")


        let bodyContent = JSON.stringify({
            "amount": amount,
            "shipment_details_id": GetShipmentDetailsData?.user_shipment_details[0]?.id,
            "delivered_address_id": GetShipmentDetailsData?.user_delivered_location[0]?.id,
            "pickup_address_id": GetShipmentDetailsData?.user_pickup_location[0]?.id
        });

        const data = await Axios({
            url: `${process.env.REACT_APP_BASE_URL}/razorpay`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${BearerToken}`,
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            data: bodyContent,
        }).then((res) => {
            console.log(res)
            return res;
        });
        console.log(data)

        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user
        let orderId = data?.data?.product_order_id
        let options = {
            key_id: "rzp_test_G0kWdsA9toFR0a", // in react your environment variable must start with REACT_APP_
            key_secret: "qW4iPbrU5Vc84pHzZc4uI5ZA",
            amount: amount,
            currency: "INR",
            description: "Test teansaction",
            image: "", // add image url
            order_id: data?.data?.order_id,
            // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            handler: function (response) {
                // we will handle success by calling handlePaymentSuccess method and
                // will pass the response that we've got from razorpay
                console.log("somjbjw")
                handlePaymentSuccess(response, orderId);
            },
        };
        console.log("responecget")

        var rzp1 = new window.Razorpay(options);
        console.log(options)
        rzp1.open();
    };



    const InputCountryCodePickupFun = (currentValue, objectValue, eventData, eventTargetValue) => {



        // we are not using all the parameters in this function , but all parameters are important becouse of this library 
        console.log(eventTargetValue);
        let data = []
        let CountryCode = eventTargetValue.split(" ")
        setCountryCodePickup(CountryCode[0])
        CountryCode.slice(1).map((items, id) => {
            data.push(items)
        })
        let myString = data.join("").replace(/\D/g, '');
        setPickupContact(myString)



    }

    const InputCountryCodeDeliveryFun = (currentValue, objectValue, eventData, eventTargetValue) => {
        // we are not using all the parameters in this function , but all parameters are important becouse of this library 

        let data = []
        let CountryCode = eventTargetValue.split(" ")
        setCountryCodeDelivery(CountryCode[0])
        CountryCode.slice(1).map((items, id) => {
            console.log(items)
            data.push(items)
        })
        let myString = data.join("").replace(/\D/g, '');
        setDeliveryContact(myString)

    }

    const AddressSelect = (e, objectId) => {


        console.log("objectIdobjectIdobjectId", objectId)
        let splitCountruCode = objectId.phone_number.split("-")
        console.log(splitCountruCode)

        setPatchObjectId(objectId.id)
        setPickupName(objectId.name)
        setPickupContact(splitCountruCode[1])
        setPickUpAddress(objectId.address)
        setPickupCity(objectId.city)
        setPickupState(objectId.state)
        setCountryCodePickup(splitCountruCode[0])

        setPickUpPopup(false)
    }


    let array = [

        { value: "SAME_DAY_DELIVERY", key: "Same day delivery" },
        { value: "AIR_DELIVERY", key: "Air delivery" },
        { value: "INTERNATIONAL_COURIER_SERVICE", key: "Internation Courier service" },
        { value: "REVERSE_PICKUP_SERVICE_WITH_SAME_PRICE", key: "Reverse pickup service with same price" },
        { value: "SAME_DAY_PICKUP_AND_DROP", key: "Same day pickup and drop" },
        { value: "INTERSTATE_PRIVATE_DELIVERY", key: "Interstate private delivery" },
        { value: "EXPRESS_DELIERY", key: "Express delivery<" },
        { value: "SPECIAL_DELIVERY", key: "Special delivery" },
        { value: "SURFACE", key: "Surface" },
        { value: "OTHERS", key: "Others" },
    ]



    return (
        <Layout
            searchBox="none"
        >
            <div className='shipping-sec'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='shippingleft-part'>
                                <h4>Check Pincode</h4>
                                <form className='row'>
                                    <div className='form-box col-12 mb-3'>
                                        <label className='form-label'>From</label>
                                        <input type="number" className={`form-control check-box  ${!pickuppincodeactive && pickuppincode ? "alert_border" : ""} `} placeholder="Pickup Pincode"
                                            value={pickuppincode} onChange={(e) => PickupPinCodeFun(e)} />
                                        {!pickuppincodeactive && pickuppincode && <span className='text-danger '>
                                            <small> Pincode is not available </small></span>}
                                        <span className='check-img '>
                                            <svg width="39" height="39" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_347_16599" fill="white">
                                                    <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" />
                                                </mask>
                                                <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" fill="#FFC900"
                                                    fill-opacity={pickuppincodeactive ? "1" : "0.1"} />
                                                <path d="M0.00012207 -1H35.0001C37.7615 -1 40.0001 1.23858 40.0001 4H38.0001C38.0001 2.34315 36.657 1 35.0001 1H0.00012207V-1ZM40.0001 37C40.0001 39.7614 37.7615 42 35.0001 42H0.00012207V40H35.0001C36.657 40 38.0001 38.6569 38.0001 37H40.0001ZM0.00012207 41V0V41ZM35.0001 -1C37.7615 -1 40.0001 1.23858 40.0001 4V37C40.0001 39.7614 37.7615 42 35.0001 42V40C36.657 40 38.0001 38.6569 38.0001 37V4C38.0001 2.34315 36.657 1 35.0001 1V-1Z" fill="#EDEDED" mask="url(#path-1-inside-1_347_16599)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4295 14.0128C27.2657 14.0367 27.146 14.0743 26.9674 14.158C26.8055 14.2339 26.59 14.429 25.9048 15.1196C25.4752 15.5526 24.9631 16.0647 24.3148 16.7093C24.0919 16.931 23.7333 17.2887 23.5179 17.5041C23.1675 17.8547 21.1614 19.8593 20.2325 20.7871C20.0358 20.9835 19.6782 21.3412 19.4378 21.5819C19.1974 21.8227 18.8954 22.1236 18.7668 22.2507C18.6382 22.3777 18.4414 22.5727 18.3294 22.6839C18.2174 22.7952 18.1164 22.883 18.1049 22.8791C18.0844 22.8721 17.9665 22.7733 16.4923 21.5268C16.0818 21.1797 15.5479 20.7283 15.3059 20.5236C14.2217 19.6069 14.174 19.569 14.0043 19.4884C13.8317 19.4065 13.5352 19.3353 13.3694 19.336C13.2036 19.3368 12.9384 19.4023 12.7511 19.4889C12.2536 19.7189 11.9335 20.2809 12.0117 20.7869C12.0853 21.2627 12.1646 21.3627 13.0826 22.1374C13.1894 22.2275 13.6123 22.5842 14.0224 22.93C14.4325 23.2759 15.1743 23.902 15.671 24.3213C17.4601 25.832 17.3978 25.7816 17.5795 25.866C17.7981 25.9674 17.9441 25.9988 18.2029 26C18.5088 26.0014 18.8108 25.9057 19.0418 25.7342C19.0931 25.6962 19.5105 25.2906 19.9693 24.833C20.4282 24.3754 20.9753 23.8299 21.1851 23.6208C21.395 23.4117 21.8577 22.9501 22.2134 22.595C22.5692 22.2399 23.213 21.5971 23.6442 21.1666C24.0755 20.7361 24.9934 19.8189 25.6841 19.1283C26.3747 18.4377 27.035 17.7794 27.1514 17.6654C27.648 17.1786 28.5891 16.2332 28.6838 16.1259C29.1387 15.6106 29.0986 14.8604 28.5905 14.379C28.2969 14.1009 27.8316 13.9542 27.4295 14.0128Z" fill="white" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className='form-box col-12 '>
                                        <label className='form-label'>To</label>
                                        <input type="number" maxlength={6} className={`form-control check-box ${!deliverypincodeactive && deliveredpincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                                            value={deliveredpincode} onChange={(e) => DeliveredPincodeFun(e)} />
                                        {!deliverypincodeactive && deliveredpincode && <span className='text-danger '>
                                            <small> Pincode is not available </small></span>}
                                        <span className='check-img' >
                                            <svg width="39" height="39" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_347_16599" fill="white">
                                                    <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" />
                                                </mask>
                                                <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" fill="#FFC900"
                                                    fill-opacity={deliverypincodeactive ? "1" : "0.1"} />
                                                <path d="M0.00012207 -1H35.0001C37.7615 -1 40.0001 1.23858 40.0001 4H38.0001C38.0001 2.34315 36.657 1 35.0001 1H0.00012207V-1ZM40.0001 37C40.0001 39.7614 37.7615 42 35.0001 42H0.00012207V40H35.0001C36.657 40 38.0001 38.6569 38.0001 37H40.0001ZM0.00012207 41V0V41ZM35.0001 -1C37.7615 -1 40.0001 1.23858 40.0001 4V37C40.0001 39.7614 37.7615 42 35.0001 42V40C36.657 40 38.0001 38.6569 38.0001 37V4C38.0001 2.34315 36.657 1 35.0001 1V-1Z" fill="#EDEDED" mask="url(#path-1-inside-1_347_16599)" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4295 14.0128C27.2657 14.0367 27.146 14.0743 26.9674 14.158C26.8055 14.2339 26.59 14.429 25.9048 15.1196C25.4752 15.5526 24.9631 16.0647 24.3148 16.7093C24.0919 16.931 23.7333 17.2887 23.5179 17.5041C23.1675 17.8547 21.1614 19.8593 20.2325 20.7871C20.0358 20.9835 19.6782 21.3412 19.4378 21.5819C19.1974 21.8227 18.8954 22.1236 18.7668 22.2507C18.6382 22.3777 18.4414 22.5727 18.3294 22.6839C18.2174 22.7952 18.1164 22.883 18.1049 22.8791C18.0844 22.8721 17.9665 22.7733 16.4923 21.5268C16.0818 21.1797 15.5479 20.7283 15.3059 20.5236C14.2217 19.6069 14.174 19.569 14.0043 19.4884C13.8317 19.4065 13.5352 19.3353 13.3694 19.336C13.2036 19.3368 12.9384 19.4023 12.7511 19.4889C12.2536 19.7189 11.9335 20.2809 12.0117 20.7869C12.0853 21.2627 12.1646 21.3627 13.0826 22.1374C13.1894 22.2275 13.6123 22.5842 14.0224 22.93C14.4325 23.2759 15.1743 23.902 15.671 24.3213C17.4601 25.832 17.3978 25.7816 17.5795 25.866C17.7981 25.9674 17.9441 25.9988 18.2029 26C18.5088 26.0014 18.8108 25.9057 19.0418 25.7342C19.0931 25.6962 19.5105 25.2906 19.9693 24.833C20.4282 24.3754 20.9753 23.8299 21.1851 23.6208C21.395 23.4117 21.8577 22.9501 22.2134 22.595C22.5692 22.2399 23.213 21.5971 23.6442 21.1666C24.0755 20.7361 24.9934 19.8189 25.6841 19.1283C26.3747 18.4377 27.035 17.7794 27.1514 17.6654C27.648 17.1786 28.5891 16.2332 28.6838 16.1259C29.1387 15.6106 29.0986 14.8604 28.5905 14.379C28.2969 14.1009 27.8316 13.9542 27.4295 14.0128Z" fill="white" />
                                            </svg>
                                        </span>
                                    </div>
                                </form>
                                <br />  <br />
                                <div className={`${deliverypincodeactive && pickuppincodeactive ? " " : "disable_opercity"} `}>
                                    <h4>Shipment Details</h4>
                                    <form className='row' >
                                        <div className='form-box select-arrow col-12 mb-3'>
                                            <label className='form-label'>Product Type</label>
                                            <select className='form-control' placeholder="Select"
                                                onChange={(e) => { setSelectedProduct(e.target.value) }}>
                                                <option value="none" selected disabled hidden>Select Product Type...</option>
                                                <option value="CLOTHES" >Clothes</option>
                                                <option value="GLASS"   > Glass</option>
                                                <option value="OTHERS"  > Others</option>
                                            </select>
                                        </div>
                                        <div className='form-box select-arrow col-md-6 mb-3'>
                                            <label className='form-label'>Delivery Type</label>
                                            <select className={`' ' ${deliverytypeerror ? "alert_border form-control" : "form-control"}`} placeholder="Select"
                                                onChange={(e) => SelectDeliveryType(e)}>
                                                <option value="none" selected disabled hidden>Select Delivery Type...</option>
                                                {
                                                    array?.map((item, id) => {
                                                        return <option value={item.value}>{item.key}</option>
                                                    })
                                                }

                                            </select>


                                            {deliverytypeerror && <span className='text-danger '>
                                                <small> Delivery type is not available </small></span>}
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <label className='form-label'>Weight</label>
                                            <input type="number" className='form-control check-box' placeholder="Weight"
                                                value={weight} onChange={(e) => setWeight(e.target.value > 0 ? e.target.value : "")} />
                                            <span className='kg-text'>( Kg )</span>
                                        </div>
                                    </form>
                                    <div className='shipment-box'>
                                        <p>Want us to pack your shipment?</p>
                                        <div className='shipment-btn'>
                                            <button type='button' className={yesnoactivebutton ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButton(true)}>Yes</button>
                                            <button type='button' className={!yesnoactivebutton ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButton(false)}>No</button>
                                        </div>
                                    </div>
                                    <form className='row'>
                                        <div className='form-box col-12 mb-4'>
                                            <label className='form-label'>Pick-up Date</label>
                                            <input type="date" className='form-control date-form' placeholder="Choose From Calendar"
                                                value={date} onChange={(e) => CurrentDateFun(e)} />
                                            <span className='date-img'>
                                            </span>
                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <label className='form-label'>Pickup Address</label>
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="Name"
                                                value={pickupname} onChange={(e) => setPickupName(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>

                                            <PhoneInput
                                                country={'in'}
                                                value={countrycodepickup + pickupcontact}
                                                onChange={InputCountryCodePickupFun}
                                                className="input_filed"
                                            />

                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <PlacesAutocomplete
                                                value={pickupaddress}
                                                onChange={(e) => PickupAddressFun(e)}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className={pickupaddressactive ? "mb-4" : ""}>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Search Places ...',
                                                                className: 'location-search-input',
                                                            })}
                                                            className={`form-control`}
                                                        // please don't remove this class this is for validation 
                                                        // className={`form-control ${pickupaddressactive ? "alert_border" : ""}`}
                                                        />
                                                        <div className="autocomplete-dropdown-container">

                                                            {suggestions.map(suggestion => {
                                                                console.log(suggestion)
                                                                const className = suggestion.activesi
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
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
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="City"
                                                value={pickupcity} onChange={(e) => setPickupCity(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="State"
                                                value={pickupstate} onChange={(e) => setPickupState(e.target.value)} />
                                        </div>

                                        <div className='form-box col-12 mb-3'>
                                            <label className='form-label'>Delivery Address</label>
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="Name"
                                                value={deliveryname} onChange={(e) => setDeliveryName(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>

                                            <PhoneInput
                                                country={'in'}
                                                onChange={InputCountryCodeDeliveryFun}
                                                className="input_filed"
                                            />

                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <PlacesAutocomplete
                                                value={deliveryaddress}
                                                onChange={(e) => DeliveryAddressFun(e)}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className={deliveryaddressactive ? "mb-4" : ""}>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Search Places ...',
                                                                className: 'location-search-input',
                                                            })}
                                                            className={`form-control`}
                                                        // please don't remove this class this is for validation 
                                                        // className={`form-control ${deliveryaddressactive ? "alert_border" : ""}`}

                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map(suggestion => {
                                                                console.log(suggestion)
                                                                const className = suggestion.activesi
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';

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

                                                            {/* {!suggestions[0]?.description && deliveryaddressactive ? <span className='text-danger mb-4 '>
                                                                <small> This address is not available </small></span> : setDeliveryAddressActive(false)} */}

                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>

                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="City"
                                                value={deliverycity} onChange={(e) => setDeliveryCity(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="State"
                                                value={deliverystate} onChange={(e) => setDeliveryState(e.target.value)} />
                                        </div>
                                    </form>    <input type="button" className='btn' value="Confirm" style={{ fontSize: "19px", color: "#000", fontWeight: 600, borderRadius: "10px", backgroundColor: "#FFC900", borderColor: "#FFC900", padding: "6px 42px" }}
                                        onClick={(e) => { pickuppincodeactive && deliverypincodeactive && ConfirmDeleverFun(e); e.preventDefault() }} />

                                </div>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className="shipmentright-part">
                                <h3 className=''>Shipment Details</h3>
                                <hr />
                                <h5 className='mb-2'>Pickup Location</h5>
                                <p>
                                    {!GetShipmentDetailsData ? "Add your Pickup Location " : GetShipmentDetailsData && `${GetShipmentDetailsData.user_pickup_location[0].address},
                                    ${GetShipmentDetailsData.user_pickup_location[0].city}, ${GetShipmentDetailsData.user_pickup_location[0].pincode},
                                    ${GetShipmentDetailsData.user_pickup_location[0].state}`
                                    }
                                </p>
                                <h5 className='mb-2'>Deliver Location</h5>
                                <p>
                                    {!GetShipmentDetailsData ? "Add your Deliver Location " : GetShipmentDetailsData && `${GetShipmentDetailsData.user_delivered_location[0].address},
                                    ${GetShipmentDetailsData.user_delivered_location[0].city}, ${GetShipmentDetailsData.user_delivered_location[0].pincode},
                                    ${GetShipmentDetailsData.user_delivered_location[0].state}`}

                                </p>
                                <div className='row'>
                                    <div className='col-md-8 col-6'>
                                        <h5>Date </h5>
                                        <p className='mb-0'>
                                            {!GetShipmentDetailsData ? "Select your date" : GetShipmentDetailsData && `${GetShipmentDetailsData.user_shipment_details[0].pickup_date}`}

                                        </p>
                                    </div>
                                    <div className='col-md-4 col-6'>
                                        <h5>Delivery Type </h5>
                                        <p className='mb-0'>
                                            {!GetShipmentDetailsData ? "Select your Delivery type" : GetShipmentDetailsData && `${GetShipmentDetailsData.user_shipment_details[0].delivery_type}`}

                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <h3>Packages</h3>
                                <div className='row'>
                                    <div className='col-md-8 col-6'><p className='mb-2'>Shipping Cost</p></div>
                                    <div className='col-md-4 col-6'><h4>

                                        Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.shipping_cost}`}

                                        /-</h4></div>
                                    <div className='col-md-8 col-6'><p className='mb-2'>GST</p></div>
                                    <div className='col-md-4 col-6'><h4>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.gst}`}/-</h4></div>
                                    <div className='col-md-8 col-6'><p className='mb-2'>Packeging Cost</p></div>
                                    <div className='col-md-4 col-6'><h4>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.pacakaging_cost}`}/-</h4></div>
                                </div>
                                <hr />
                                <div className='row mt-5 mb-4'>
                                    <div className='col-md-8 col-6'><h2>Total Amount</h2></div>
                                    <div className='col-md-4 col-6'><h2>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.total_price}`}/-</h2></div>
                                </div>
                                <button type='button'
                                    className={`${GetShipmentDetailsData ? "btn" : "disable_opercity btn"} `}
                                    onClick={(e) => GetShipmentDetailsData && PaymentFun(e, GetShipmentDetailsData && GetShipmentDetailsData.calculation_details.total_price)}>
                                    Proceed To Pay </button>
                            </div>
                        </div>
                    </div>
                </div>
                <LodingSpiner
                    loadspiner={loadspiner} />
            </div>


            <Popup open={pickuppopup} position="" model className="sign_up_loader">
                <div className="container">
                    <div className='loader-sec adresloader-sec'>
                        <div className="justify-content-center w-50 rounded   bg-white">
                            <div className='d-flex justify-content-between px-3 pt-3'>
                                <h3>
                                    select Address
                                </h3>
                                <h4 className='pe-3' role="button" onClick={(e) => setPickUpPopup(false)}> X </h4>
                            </div>
                            <hr className='my-2' />
                            <div className='px-3 py-1 text-warning'>
                                <span className='px-2'>
                                    <svg width="15" height="15" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5607 0.0168947C3.63832 0.10573 2.74429 0.437784 2.01918 0.960827C1.7398 1.16235 1.27777 1.59894 1.065 1.8625C-5.90139e-06 3.18158 -0.283358 4.90549 0.292324 6.56372C0.749743 7.88133 1.64914 9.16642 3.03126 10.4773C3.62086 11.0365 4.4823 11.7374 4.83983 11.9488C5.02196 12.0565 5.10964 12.0189 5.66571 11.5945C6.70124 10.8042 7.75647 9.76605 8.44956 8.85573C9.21981 7.84408 9.74991 6.72869 9.9334 5.73376C10.0327 5.19515 10.0198 4.4179 9.90229 3.8579C9.56115 2.23226 8.29422 0.832679 6.65619 0.271824C6.03962 0.0607362 5.18503 -0.04324 4.5607 0.0168947ZM5.37565 0.589728C6.46519 0.689899 7.40563 1.12143 8.15676 1.86577C9.30664 3.0053 9.69947 4.61704 9.21053 6.18933C8.95991 6.9952 8.52965 7.78783 7.90858 8.58775C7.20709 9.49127 6.17407 10.4912 5.15177 11.2563L5.00409 11.3668L4.76167 11.1836C4.34857 10.8714 3.79054 10.3937 3.38492 10.0051C1.14175 7.85592 0.218841 5.71133 0.719162 3.81047C1.00622 2.71993 1.75237 1.75231 2.75666 1.16832C3.28085 0.863497 3.95944 0.649729 4.58971 0.590854C4.93154 0.558937 5.03889 0.558777 5.37565 0.589728ZM4.50545 2.47783C3.91162 2.59424 3.32234 2.96521 2.96968 3.44462C2.47696 4.11444 2.36604 5.0114 2.68265 5.76608C2.91424 6.31809 3.33116 6.75369 3.88388 7.02111C4.29638 7.22067 4.51738 7.26979 5.0027 7.26979C5.48678 7.26979 5.70707 7.22105 6.12153 7.02223C6.66005 6.7639 7.09435 6.31418 7.3135 5.78792C7.44845 5.46377 7.49481 5.23288 7.49646 4.87623C7.49834 4.47364 7.43428 4.18227 7.26825 3.83858C6.92691 3.13203 6.25432 2.61954 5.47965 2.47577C5.22873 2.4292 4.74841 2.43021 4.50545 2.47783ZM5.38371 3.04132C5.85522 3.132 6.32198 3.43833 6.59444 3.8359C6.95189 4.35747 7.01059 5.07351 6.74119 5.62609C6.48916 6.14302 6.03045 6.51709 5.47233 6.66076C5.23078 6.72293 4.77289 6.72266 4.53308 6.6602C3.8386 6.47934 3.28958 5.92963 3.13643 5.26185C3.06452 4.94823 3.09137 4.53059 3.20223 4.23916C3.53525 3.36351 4.44932 2.86161 5.38371 3.04132ZM4.87839 3.74787C4.73502 3.80835 4.71325 3.86897 4.70297 4.23586L4.69327 4.58145H4.34862C4.00449 4.58145 4.0038 4.58158 3.92319 4.65978C3.85993 4.72115 3.84244 4.76215 3.84244 4.84913C3.84244 5.09107 3.93924 5.14421 4.37976 5.14421H4.69883V5.43984C4.69883 5.80373 4.73449 5.90484 4.8843 5.96589C4.97552 6.00303 5.00301 6.00378 5.09939 5.97162C5.26752 5.91553 5.3065 5.81657 5.30653 5.44568L5.30658 5.14421H5.62565C5.99627 5.14421 6.08948 5.11269 6.15269 4.96595C6.20313 4.84881 6.16611 4.716 6.06056 4.63547C5.99832 4.58799 5.94881 4.58145 5.65096 4.58145H5.31213L5.30244 4.23366C5.29318 3.90089 5.28968 3.88288 5.22103 3.81629C5.14357 3.74117 4.97436 3.70741 4.87839 3.74787Z" fill="#FFCD14" />
                                    </svg>
                                </span>
                                <span className='mt-2'> <small> <b>
                                    Add New Address</b>
                                </small>
                                </span>
                            </div>
                            <hr className='my-2' />
                            <div className='px-3 pb-4' style={{ height: "500px", overflow: "overlay" }}>
                                <b> Address Details </b>
                                {pickuppatchfilterdata && pickuppatchfilterdata.map((item, id) => {
                                    console.log(item)
                                    return <div className='d-flex justify-content-between'>

                                        <div className='d-flex pt-3'>
                                            <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="15.5" cy="15.5" r="15" fill="white" stroke="#D9D9D9" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4728 8.02253C14.366 8.14097 13.2931 8.58371 12.423 9.2811C12.0878 9.5498 11.5333 10.1319 11.278 10.4833C9.99999 12.2421 9.65997 14.5407 10.3508 16.7516C10.8997 18.5084 11.979 20.2219 13.6375 21.9697C14.345 22.7153 15.3788 23.6498 15.8078 23.9317C16.0264 24.0754 16.1316 24.0252 16.7989 23.4593C18.0415 22.4056 19.3078 21.0214 20.1395 19.8076C21.0638 18.4588 21.6999 16.9716 21.9201 15.645C22.0393 14.9269 22.0238 13.8905 21.8827 13.1439C21.4734 10.9763 19.9531 9.11024 17.9874 8.36243C17.2475 8.08098 16.222 7.94235 15.4728 8.02253ZM16.4508 8.7863C17.7582 8.91987 18.8868 9.49524 19.7881 10.4877C21.168 12.0071 21.6394 14.156 21.0526 16.2524C20.7519 17.3269 20.2356 18.3838 19.4903 19.4503C18.6485 20.655 17.4089 21.9883 16.1821 23.0084L16.0049 23.1558L15.714 22.9115C15.2183 22.4952 14.5486 21.8583 14.0619 21.3401C11.3701 18.4746 10.2626 15.6151 10.863 13.0806C11.2075 11.6266 12.1028 10.3364 13.308 9.55776C13.937 9.15133 14.7513 8.86631 15.5076 8.78781C15.9179 8.74525 16.0467 8.74504 16.4508 8.7863ZM15.4065 11.3038C14.6939 11.459 13.9868 11.9536 13.5636 12.5928C12.9723 13.4859 12.8392 14.6819 13.2192 15.6881C13.4971 16.4241 13.9974 17.0049 14.6607 17.3615C15.1557 17.6276 15.4209 17.6931 16.0032 17.6931C16.5841 17.6931 16.8485 17.6281 17.3458 17.363C17.9921 17.0185 18.5132 16.4189 18.7762 15.7172C18.9381 15.285 18.9938 14.9772 18.9958 14.5016C18.998 13.9649 18.9211 13.5764 18.7219 13.1181C18.3123 12.176 17.5052 11.4927 16.5756 11.301C16.2745 11.2389 15.6981 11.2403 15.4065 11.3038ZM16.4605 12.0551C17.0263 12.176 17.5864 12.5844 17.9133 13.1145C18.3423 13.81 18.4127 14.7647 18.0894 15.5015C17.787 16.1907 17.2365 16.6895 16.5668 16.881C16.2769 16.9639 15.7275 16.9635 15.4397 16.8803C14.6063 16.6391 13.9475 15.9062 13.7637 15.0158C13.6774 14.5976 13.7096 14.0408 13.8427 13.6522C14.2423 12.4847 15.3392 11.8155 16.4605 12.0551Z" fill="#777777" />
                                            </svg>
                                            <div className='px-4 '>
                                                <h6 className='p-0 m-0'><small><b>  {item.name}</b></small></h6>
                                                <span><small>{item.address}</small></span>
                                            </div>

                                        </div>

                                        <div className='text-warning pe-3 pt-4  ' style={{ cursor: "pointer" }}
                                            onClick={(e) => AddressSelect(e, item)}>
                                            <b>  select</b>
                                        </div>


                                    </div>
                                })}
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </Popup>



        </Layout>
    )

}

export default Shipping