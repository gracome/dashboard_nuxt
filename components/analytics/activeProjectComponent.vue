<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="table-responsive active-projects shorting">
        <div class="tbl-caption">
          <h4 class="heading mb-0">Active Projects</h4>
        </div>
        <table id="projects-tbl" class="table ItemsCheckboxSec">
          <thead>
            <tr>
              <th>
                <div class="form-check custom-checkbox ms-0">
                  <input
                    type="checkbox"
                    class="form-check-input checkAllInput"
                    id="checkAll"
                    required=""
                  />
                  <label class="form-check-label" for="checkAll"></label>
                </div>
              </th>
              <th>Project Name</th>
              <th>Project Lead</th>
              <th>Progress</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox2"
                    required=""
                  />
                  <label class="form-check-label" for="customCheckBox2"></label>
                </div>
              </td>
              <td>Batman</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Liam Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">53%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>08 Sep 2023</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox3"
                    required=""
                  />
                  <label class="form-check-label" for="customCheckBox3"></label>
                </div>
              </td>
              <td>Mivy App</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Honey Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">52%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox22"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox22"
                  ></label>
                </div>
              </td>
              <td>Crypto App</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic2.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Ankites Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">58%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0">Pending</span>
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox33"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox33"
                  ></label>
                </div>
              </td>
              <td>Bender Project</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic2.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Oliver Noah</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 30%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-danger">30%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0">Pending</span>
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox044"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox044"
                  ></label>
                </div>
              </td>
              <td>Canary</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic888.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Elijah James</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      style="width: 40%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-success">40%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-success light border-0"
                  >Completed</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox055"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox055"
                  ></label>
                </div>
              </td>
              <td>Casanova</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">William Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">53%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox23"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox23"
                  ></label>
                </div>
              </td>
              <td>Bender Project</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic2.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Oliver Noah</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 30%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-danger">30%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0">Pending</span>
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox44"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox44"
                  ></label>
                </div>
              </td>
              <td>Canary</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic888.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Elijah James</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      style="width: 40%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-success">40%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-success light border-0"
                  >Completed</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox55"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox55"
                  ></label>
                </div>
              </td>
              <td>Casanova</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">William Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">53%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox66"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox66"
                  ></label>
                </div>
              </td>
              <td>Bigfish</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Donald Benjamin</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 30%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-danger">30%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox7"
                    required=""
                  />
                  <label class="form-check-label" for="customCheckBox7"></label>
                </div>
              </td>
              <td>Matadors</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic888.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Liam Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">53%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox88"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox88"
                  ></label>
                </div>
              </td>
              <td>Mercury</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic2.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Oliver Noah</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 30%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-danger">30%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic777.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-danger light border-0">Pending</span>
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox99"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox99"
                  ></label>
                </div>
              </td>
              <td>Whistler</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic999.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Elijah James</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      style="width: 40%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-success">40%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic666.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-success light border-0"
                  >Completed</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox0102"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox0102"
                  ></label>
                </div>
              </td>
              <td>Time Projects</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic2.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">Lucas</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-danger"
                      style="width: 33%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">33%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic999.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="customCheckBox110"
                    required=""
                  />
                  <label
                    class="form-check-label"
                    for="customCheckBox110"
                  ></label>
                </div>
              </td>
              <td>Fast Ball</td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <p class="mb-0 ms-2">William Risher</p>
                </div>
              </td>
              <td class="pe-0">
                <div class="tbl-progress-box">
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary"
                      style="width: 53%; height: 5px; border-radius: 4px"
                      role="progressbar"
                    ></div>
                  </div>
                  <span class="text-primary">53%</span>
                </div>
              </td>
              <td class="pe-0">
                <div class="avatar-list avatar-list-stacked">
                  <img
                    src="../../assets/images/contacts/pic1.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic555.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                  <img
                    src="../../assets/images/contacts/pic999.jpg"
                    class="avatar rounded-circle"
                    alt=""
                  />
                </div>
              </td>
              <td class="pe-0">
                <span class="badge badge-primary light border-0"
                  >Inprogress</span
                >
              </td>
              <td>
                <span>06 Sep 2021</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>