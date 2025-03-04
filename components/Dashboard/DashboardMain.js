import styles from './Styles.module.scss';
import Image from 'next/image';

import status_check from '../../assets/status_check.png';
import caret_down from '../../assets/caret_down.png';
import { useContext, useState, useEffect } from 'react';
import Modal from './../Modal/Index';
import SelectInput from './../misc/SelectInput';
import VillageContext from '../../Context/villageContext';
import useVillage from '../../Context/villageContext';

const DashboardMain = () => {
  ////// Modal State
  const [showModal, setShowModal] = useState(false);

  ////// Add Village Function
  // Village State
  const [selectedVillages, setSelectedVillages] = useState([]);

  const handleChange = (e) => {
    let currentVillages = [];
    const selectedVillages = e.target.value;
    const selectedVillagesArray = currentVillages.push(selectedVillages);

    setSelectedVillages((previousVillages) =>
      previousVillages.concat(currentVillages)
    );
  };

  /////// Add Contributor Function

  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    village: '',
  };

  // Contributor state
  const [contributor, setContributor] = useState({ initialValues });

  const contributeChange = (e) => {
    const { name, value } = e.target;
    setContributor({
      ...contributor,
      [name]: value,
    });
  };

  const contributeSubmit = (e) => {
    e.preventDefault();
    // console.log(contributor);
    setContributor(initialValues);
    setShowModal(false);
  };

  const { villages, removeVillage } = useVillage();

  //Effect to hide scroll
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <div className={styles.dashboardmain}>
      <h2>Welcome Sandra</h2>
      <hr />
      <div className={styles.village_control}>
        <div className={styles.village_control__input}>
          <h3>VIllages you have control in</h3>
          <p>Add the villages you have control over within your state.</p>
          <div className={styles.input}>
            <SelectInput default="Select your village" />
          </div>
        </div>
        <div className={styles.village_control__outputs}>
          {villages.map((village, index) => {
            return (
              <div key={index} className={styles.output}>
                <p>{village}</p>{' '}
                <span
                  onClick={() => removeVillage(village)}
                  className={styles.cancel}
                >
                  x
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className={styles.main_bottom}>
        <div className={styles.main_bottom__contact}>
          <form action="">
            <h5>Specify your key contact</h5>
            <p>
              Specify your key contact information we can always reach you on.
            </p>
            <div className={styles.input_field}>
              <input type="text" placeholder="Full name" />
              <input type="text" placeholder="Phone number" />
              <input type="text" placeholder="Whatsapp number" />
            </div>
            <button className="btn_dark">Save</button>
          </form>
        </div>
        <div className={styles.main_bottom__contributors}>
          <div className={styles.heading}>
            <h5>Contributors</h5>
            <p onClick={() => setShowModal(true)}>Add a new contributor</p>
          </div>

          {/* CONTRIBUTOR MODAL */}
          {showModal && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <div className={styles.modal}>
                <div className={styles.modal__heading}>
                  <h2>
                    Add a new <br />
                    <span>Contributor</span>
                  </h2>
                </div>
                <div className={styles.modal__body}>
                  <p>Kindly enter the details of a contributor</p>
                  <div className={styles.details_form}>
                    <form action="">
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        value={contributor.first_name}
                        onChange={contributeChange}
                      />
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={contributor.last_name}
                        onChange={contributeChange}
                      />
                      <div className={styles.select}>
                        <SelectInput option="Phone Number" name="number" />
                      </div>
                      <div className={styles.select}>
                        <SelectInput option="Select a village" name="village" />
                      </div>
                      <div className={`${styles.btn_submit}`}>
                        <input
                          type="button"
                          value="Continue"
                          onClick={contributeSubmit}
                          className="btn_dark"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal>
          )}
          {/* CONTRIBUTOR MODAL END */}
          <div className={styles.contributors_table}>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Mobile number</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>Okolie Festus</td>
                  <td>07085128680</td>
                  <td>
                    <Image src={status_check} />
                  </td>
                </tr>
                <tr>
                  <td>Okolie Festus</td>
                  <td>07085128680</td>
                  <td>
                    <Image src={status_check} />
                  </td>
                </tr>
                <tr>
                  <td>Okolie Festus</td>
                  <td>07085128680</td>
                  <td>
                    <Image src={status_check} />
                  </td>
                </tr>
                <tr>
                  <td>Okolie Festus</td>
                  <td>07085128680</td>
                  <td>
                    <Image src={status_check} />
                  </td>
                </tr>
                <tr>
                  <td>Okolie Festus</td>
                  <td>07085128680</td>
                  <td>
                    <Image src={status_check} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
