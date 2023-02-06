import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetAdminCloneOrder, PostAdminOrderAddShipment, PostAdminOrderPaymentCal, PostPincodesAvailability } from "../../Redux/action/ApiCollection";

const OrderDatails = () => {


  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [breadth, setBreadth] = useState("")
  const [height, setHeight] = useState("")
  const [deliveryproduct, setDeliveryProduct] = useState('')
  const [selectedproduct, setSelectedProduct] = useState(null)
  const [quentity, setQuentity] = useState("")
  const [date, setDate] = useState('')
  const [yesnoactivebutton, setYesNoActiveButton] = useState(true)

  const [tax, setTax] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [total, setTotal] = useState("")
  const [producttypeerorr, setProductTypeErorr] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const PostAdminOrderPaymentCalReducerData = useSelector(state => state.PostAdminOrderPaymentCalReducer?.PostAdminOrderPaymentCalReducerData)
  const PostAdminOrderAddShipmentReducerData = useSelector(state => state.PostAdminOrderAddShipmentReducer?.PostAdminOrderAddShipmentReducerData)
  const GetAdminCloneOrderData = useSelector(state => state.GetAdminCloneOrderReducer.GetAdminCloneOrderData?.data)

  console.log(PostAdminOrderAddShipmentReducerData)

  useEffect(() => { 
    let ProductOrderId = reactLocalStorage.get("product_order_id", false);
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId)


    let PayloadData = {
      "product_order_id": OrderDetailsIdData.product_order_id,
      "product_type": selectedproduct,
      "delivery_type": deliveryproduct,
      "weight": weight,
      "pickup_date": date,
      "pack_shipment": yesnoactivebutton,
      "length": length,
      "breadth": breadth,
      "height": height,
      "quantity": quentity,
    }
    console.log("PayloadData11", PayloadData)

    if (deliveryproduct && selectedproduct && quentity && weight && date  && breadth && length && height) {
      if (selectedproduct !== null && selectedproduct !== "none" && 
          deliveryproduct !== null && deliveryproduct !== "none") {
        setProductTypeErorr(false)
        dispatch(PostAdminOrderPaymentCal(PayloadData))

      }
      else {     
         toast.warn("please select all fields ");


        // setProductTypeErorr(true)
      }

    }

    console.log(producttypeerorr)





    // deliveryproduct && selectedproduct == null || "none" ? setProductTypeErorr(true) : selectedproduct && quentity && weight && date && yesnoactivebutton && breadth && length && height &&
    //   dispatch(PostAdminOrderPaymentCal(PayloadData))

  }, [deliveryproduct, breadth, length, height, selectedproduct, quentity, weight, date, yesnoactivebutton])

  console.log(selectedproduct)


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
    PostAdminOrderPaymentCalReducerData &&
      setTax(PostAdminOrderPaymentCalReducerData?.data?.gst)
    setPrice(PostAdminOrderPaymentCalReducerData?.data?.price)
    setDiscount("0")
    setTotal(PostAdminOrderPaymentCalReducerData?.data?.total_price)
    if (PostAdminOrderAddShipmentReducerData.status == 200) {
      navigate("/admin/order/ordersummary");
    }

  }, [PostAdminOrderPaymentCalReducerData, PostAdminOrderAddShipmentReducerData])


  const ItemDetailsNextBtnFun = () => {
    // let ProductOrderId = reactLocalStorage.get("product_order_id", false); 
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId)
    // console.log(ProductOrderId.order_id)
    let PayloadData = {
      "product_order_id": OrderDetailsIdData.product_order_id,
      "product_type": selectedproduct,
      "delivery_type": deliveryproduct,
      "weight": weight,
      "pickup_date": date,
      "pack_shipment": yesnoactivebutton,
      "length": length,
      "breadth": breadth,
      "height": height,
      "quantity": quentity,
    }
console.log("PayloadDat1",PayloadData)
    if (OrderDetailsIdData?.product_order_id && deliveryproduct && breadth && length && height && selectedproduct && quentity && weight && date ) {
      if (selectedproduct !== null && selectedproduct !== "none"
      && deliveryproduct !== null && deliveryproduct !== "none") {
        setProductTypeErorr(false)
        dispatch(PostAdminOrderAddShipment(PayloadData))

      }
      else {
        toast.warn("please select all fields ");

        // setProductTypeErorr(true)
      }
      // dispatch(PostAdminOrderAddShipment(PayloadData))
    }

  }


  useEffect(() => {
    let BearerToken = reactLocalStorage.get("token", false);
    if (!BearerToken) {
      navigate("/login");
    } else {
      navigate("#pending");
    }
    let OrderId = reactLocalStorage.get("order_id", false);
    console.log("OrderId", OrderId)
    let objectData = {
      product_order_id: OrderId,
    };
    dispatch(GetAdminCloneOrder(objectData));
  }, [])

  useEffect(() => {

    setWeight(GetAdminCloneOrderData?.shipment_details?.weight)
    setLength(GetAdminCloneOrderData?.shipment_details?.height)
    setBreadth(GetAdminCloneOrderData?.shipment_details?.breadth)
    setHeight(GetAdminCloneOrderData?.shipment_details?.height)
    setDeliveryProduct(GetAdminCloneOrderData?.shipment_details?.delivery_type)
    setSelectedProduct(GetAdminCloneOrderData?.shipment_details?.product_type)
    setQuentity(GetAdminCloneOrderData?.shipment_details?.quantity)
    setDate(GetAdminCloneOrderData?.shipment_details?.pickup_date)

  }, [GetAdminCloneOrderData])



  const SelectDeliveryType = (e) => {
    let ConsignerPinCode = reactLocalStorage.get("ConsignerPinCode", false);
    setDeliveryProduct(e.target.value)

    let payload = {
      "pincode": ConsignerPinCode,
      "delivery_type": e.target.value,
      "check_type": "PICKUP"
    }
    if (e.target.value) {
      dispatch(PostPincodesAvailability(payload))
    }

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
                className="active"
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
              <h1>Item Details</h1>
              <div className="userinfo-body">
                <h3>Product Details</h3>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Weight</label>
                    <div className="form-box mt-1">
                      <input
                        type="number"
                        className="form-control "
                        placeholder="Quantity"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>KG</span>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <label>Length</label>
                    <div className="form-box mt-1">
                      <input
                        type="number"
                        className="form-control "
                        placeholder="L"
                        value={length}
                        onChange={(e) => setLength(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span >CM</span>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <label>Breadth</label>
                    <div className="form-box mt-1">
                      <input
                        type="number"
                        className="form-control "
                        placeholder="B"
                        value={breadth}
                        onChange={(e) => setBreadth(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>CM</span>
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <label>Height</label>
                    <div className="form-box mt-1">
                      <input
                        type="number"
                        className="form-control "
                        placeholder="H"
                        value={height}
                        onChange={(e) => setHeight(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>CM</span>
                    </div>
                  </div>

                  <div className="col-sm-6 pt-3">
                    <label >Delivery Type</label>
                    <select className='form-control mt-1' placeholder="Select"
                      onChange={(e) => SelectDeliveryType(e)}
                      value={deliveryproduct}>
                      <option value="none" selected >Select Delivery Type...</option>
                      <option value="SAME_DAY_DELIVERY">Same day delivery</option>
                      <option value="AIR_DELIVERY">Air delivery</option>
                      <option value="INTERNATIONAL_COURIER_SERVICE">Internationation Courier service</option>
                      <option value="REVERSE_PICKUP_SERVICE_WITH_SAME_PRICE">Reverse pickup service with same price</option>
                      <option value="SAME_DAY_PICKUP_AND_DROP">Same day pickup and drop</option>
                      <option value="INTERSTATE_PRIVATE_DELIVERY">Interstate private delivery</option>
                      <option value="EXPRESS_DELIERY">Express delivery</option>
                      <option value="CASH_ON_DELIVERY">Cash on delivery</option>
                      <option value="SPECIAL_DELIVERY">Special delivery</option>
                    </select>
                  </div>
                  <div className="col-sm-6 pt-3">
                    <label className='form-label'>Pick-up Date</label>
                    <input type="date" className='form-control date-form' placeholder="Choose From Calendar"
                      value={date} onChange={(e) => CurrentDateFun(e)} />
                    <span className='date-img'>
                    </span>

                  </div>

                  <div className='shipment-box pt-3'>
                    <p>Want us to pack your shipment?</p>
                    <div className='shipment-btn'>
                      <button type='button' className={yesnoactivebutton ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButton(true)}>Yes</button>
                      <button type='button' className={!yesnoactivebutton ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButton(false)}>No</button>
                    </div>
                  </div>
                </div>

                <h3 className="mt-4">Package Details</h3>
                <div className="row">
                  <div className="col-sm-6">
                    <label >Product Type</label>
                    <select className='form-control' placeholder="Select"
                      onChange={(e) => { setSelectedProduct(e.target.value) }}
                      value={selectedproduct}>
                      <option value="none" selected >Select Product Type...</option>
                      <option>Clothes</option>
                      <option>Glass</option>
                      <option>Others</option>
                    </select>
                    <span>
                      {producttypeerorr && <small className="text-danger">
                        Select the product type
                      </small>}
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Quantity</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Quantity "
                          value={quentity}
                          onChange={(e) => setQuentity(e.target.value > 0 ? e.target.value : "")}

                        />
                      </div>
                      <div className="col-sm-6">
                        <label>Tax (%)</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Tax"
                          value={tax}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Price</label>
                        <input
                          type="number"
                          className="form-control mt-1"
                          placeholder="Price "
                          value={price}
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Discount</label>
                        <input
                          type="number"
                          className="form-control mt-1"
                          placeholder="Discount"
                          value={discount}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>Total</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Total (auto-generated)"
                      value={total}
                    />
                  </div>
                </div>

              </div>
              <button
                onClick={(e) => {
                  ItemDetailsNextBtnFun(e)
                }}
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

export default OrderDatails;
