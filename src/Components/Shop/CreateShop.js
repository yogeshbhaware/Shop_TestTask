import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addshop } from "../../Redux/Actions/action";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { category, area } from "../../const";
import { useHistory } from "react-router";

function CreateShop() {
  const history = useHistory();
  let startDate = new Date();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmited = (data) => {

    console.log("I am data", data);
    const shopsData = {
      ...data,
      status: "",
    };
   
    dispatch(addshop(shopsData));
    reset();
    history.push("/");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSubmited)}
        className="form-control"
        style={{ width: "1000px", margin: "20px AUTO" }}
      >
        <h2> Create Shop </h2>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Shop Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Shop Name"
              {...register("shopname", { required: true })}
            />
            {errors?.shopname?.type === "required" && (
              <p style={{ color: "red" }}> Shop Name is Required</p>
            )}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Shop Area</label>
          <div class="col-sm-4">
            <select
              placeholder="Shop Area"
              className="form-control"
              {...register("shoparea", { required: true })}
            >
              {area.map((data, index) => {
                if (index !== 0) {
                  return <option value={data.value}>{data.text}</option>;
                }
              })}
            </select>
            {errors?.shoparea?.type === "required" && (
              <p style={{ color: "red" }}> Shop Area is Required</p>
            )}
          </div>
          <label class="col-sm-2 col-form-label">Shop Category</label>
          <div class="col-sm-4">
            <select
              placeholder="Shop Categort"
              className="form-control"
              {...register("shopcategory", { required: true })}
            >
              {category.map((data, index) => {
                if (index !== 0) {
                  return <option value={data.value}>{data.text}</option>;
                }
              })}
            </select>
            {errors?.shopcategory?.type === "required" && (
              <p style={{ color: "red" }}> Shop Category is Required</p>
            )}
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Start Date</label>
          <div class="col-sm-10">
            <input
              type="date"
              class="form-control"
              placeholder="Start Date"
              {...register("startdate", {
                required: true,
                validate: (value) => {
                  startDate = value;
                },
              })}
            />
            {errors?.startdate?.type === "required" && (
              <p style={{ color: "red" }}> Start Date is Required</p>
            )}
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">End Date</label>
          <div class="col-sm-10">
            <input
              type="date"
              class="form-control"
              placeholder="End Date"
              {...register("enddate", {
                required: true,
                validate: (value) => value > startDate,
              })}
            />
            {errors?.enddate?.type === "required" && (
              <p style={{ color: "red" }}> End Date is Required</p>
            )}
            {errors?.enddate?.type === "validate" && (
              <p style={{ color: "red" }}>
                {" "}
                End Date Should be After Start Date
              </p>
            )}
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">
              Create Your Shop
            </button>
          </div>
          <div class="form-group row">
            <div class="col-sm-10"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateShop;
