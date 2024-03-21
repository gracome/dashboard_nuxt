<template>
  <div class="card">
    <div class="card-header border-0">
      <h4 class="heading mb-0">Best Selling Products</h4>
      <div class="d-flex align-items-center cs-settiong">
        <span>SORT BY:</span>
        <select class="default-select status-select normal-select">
          <option value="Today">Today</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>
    </div>
    <div class="card-body p-0">
      <div
        class="table-responsive active-projects active-projects ItemsCheckboxSec selling-product shorting"
      >
        <table id="product-tbl" class="table">
          <thead>
            <tr>
              <th>
                <div class="form-check custom-checkbox ms-0">
                  <input
                    type="checkbox"
                    class="form-check-input checkAllInput"
                    id="checkAll1"
                    required=""
                  />
                  <label class="form-check-label" for="checkAll1"></label>
                </div>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Orders</th>
              <th>Stock</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox220"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox220"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d1.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">lether Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-danger light border-0"
                  >Out of Stock</span
                >
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox123"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox123"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d2.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Men Jacket</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-danger light border-0"
                  >Out of Stock</span
                >
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox24"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox24"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d3.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Midi Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox25"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox25"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d4.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Boy Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox26"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox26"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d5.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Teen Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox27"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox27"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d6.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">White Top Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-danger light border-0"
                  >Out of Stock</span
                >
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox28"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox28"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d7.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Mobile</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox29"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox29"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d8.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Laptop</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-danger light border-0"
                  >Out of Stock</span
                >
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox30"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox30"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d14.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Air Conditioner</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox31"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox31"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d13.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Blade Table Fan</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox32"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox32"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d9.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Earphone</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox133"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox133"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d10.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Bag Pack</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$86.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-danger light border-0"
                  >Out of Stock</span
                >
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox34"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox34"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d11.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">lether jacket</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox35"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox35"
                  ></label>
                </div>
              </td>
              <td>
                <div class="products">
                  <img
                    src="../../assets/images/contacts/d12.jpg"
                    class="avatar avatar-md"
                    alt=""
                  />
                  <div>
                    <h6><a href="javascript:void(0)">Black Dress</a></h6>
                    <span>24 Apr 2021</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-primary">$85.20</span>
              </td>
              <td>
                <span>750</span>
              </td>
              <td>
                <span class="badge badge-success light border-0">In Stock</span>
              </td>
              <td>
                <span>$1200.75</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>