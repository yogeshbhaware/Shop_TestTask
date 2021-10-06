import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { category, area, status } from "../../const";
import { addshop } from "../../Redux/Actions/action";

function ShopListing() {
  

  let shopdata = useSelector((state) => {
    return state.shopData.shops;
  });
  shopdata = shopdata ? shopdata : [];
  let shopDataCopy = shopdata;
  console.log("this is selector data", shopdata);
  var today = new Date();
  const [shopsList, setShopsList] = useState(shopdata);

const [searchData, setSearchData] = useState({
    shoparea: "",
    shopcategory: "",
    status: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    shopsList.map((item) => {
      const startdate = new Date(item.startdate);
      const enddate = new Date(item.enddate);
      item.status = today > startdate && today < enddate ? true : false;
    });
    setShopsList(shopsList);
  }, [shopdata]);

  const handleDelete = (id) => {
    let localData = JSON.parse(localStorage.getItem("shops"));
    localData.splice(id, 1);
    localStorage.setItem("shops", JSON.stringify(localData));
    setShopsList(localData);
  };

  const filterData = () => {
      shopDataCopy = shopDataCopy.filter((item) => {
      let status = JSON.parse(searchData.status) 
      if (searchData.shoparea === "" && searchData.shopcategory === "") {
        if (searchData.status === "") {
          return item;
        }else if( item.status === status){
          console.log("Status",searchData.status)
          return item;
        }
      } else if (searchData.shoparea !== "" || searchData.shopcategory !== "") {
        let showdata;
        const shopArea = searchData?.shoparea?.toLowerCase()
        const shopCategory = searchData?.shopcategory?.toLowerCase()
        const itemArea = item.shoparea.toLowerCase()
        const itemCategory =  item.shopcategory.toLowerCase()

        if (itemArea.includes(shopArea) &&
          searchData.shopcategory === "" &&
          item.status == status
        ) {
          showdata = item;
        } else if (itemCategory.includes(shopCategory) &&
          searchData.shoparea === "" &&
          item.status === status
        ) {
          showdata = item;
        } else if (
          item.status === status &&
          searchData.shoparea === "" &&
          searchData.shopcategory === ""
        ) {
          showdata = item;
        } else if (itemCategory.includes(shopCategory) &&
         itemArea.includes(shopArea) &&
          item.status === status
        ) {
          showdata = item;
        }
        item = showdata;
        return item;
      }
    });

    setShopsList(shopDataCopy);
  };

  const SubmitHandler = (data) => {
    console.log("this is search data", data);
  
    setSearchData({
      shoparea: data.shoparea,
      shopcategory: data.shopcategory,
      status: data.status,
    });
    reset();

    filterData();
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(SubmitHandler)} className="form-wrapper">
        <div class="row mb-4 align-items-end mt-4">
          <div className="col-10">
            <div class="row align-items-end">
              <div className="col">
                <label class="col-form-label text-left">Shop Area</label>

                <select
                  placeholder="Shop Area"
                  className="form-control"
                  {...register("shoparea")}
                >
                  {area.map((data, index) => {
                    return <option value={data.value}>{data.text}</option>;
                  })}
                </select>
              </div>
              <div class="col">
                <label class="col-form-label text-left">Shop Category</label>
                <select
                  name="shopcategory"
                  className="form-control"
                  {...register("shopcategory")}
                >
                  {category.map((data, index) => {
                    return <option value={data.value}>{data.text}</option>;
                  })}
                </select>
              </div>
              <div class="col">
                <label class="col-form-label text-left">Shop Status</label>
                <select
                  name="status"
                  className="form-control"
                  {...register("status")}
                >
                  {status.map((data, index) => {
                    if(index !== 0){
                      return <option value={data.value}>{data.text}</option>;

                    }
                    
                    
                  })}
                </select>
              </div>
              <div class="col">
                <button
                  className="btn btn-success btn-sm"
                  type="submit"
                  style={{ marginLeft: "40px" }}
                >
                  Search Shop
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">
            <Link to="/createshop">
              {" "}
              <button className="btn btn-sm btn-success">
                {" "}
                Create Your Shop...!{" "}
              </button>
            </Link>
          </div>
        </div>
      </form>
      <div className="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Shop Number</th>
              <th scope="col">Shop Name</th>
              <th scope="col">Shop Area</th>
              <th scope="col">Shop Category</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Action</th>
              <th scope="col">Shop Status</th>
            </tr>
          </thead>
          {shopsList === undefined || shopsList.length === 0 ? (
            <tr><td colSpan="8" style={{fontSize: "18px",
    background: "#e9ffee",
    padding: "50px",
    fontWeight: "bold" }}>No Data Found</td></tr>
          ) : (
            shopsList.map((item, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.shopname}</td>
                    <td>{item.shoparea}</td>
                    <td>{item.shopcategory} </td>
                    <td>{item.startdate}</td>
                    <td>{item.enddate}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(index)}
                      >
                        Delete Shop
                      </button>
                      {console.log("full item")}
                    </td>
                    <td>{item.status ? <p>Open</p> : <p>Close</p>}</td>
                  </tr>
                </tbody>
              );
            })
          )}
        </table>
      </div>
    </div>
  );
}

export default ShopListing;
