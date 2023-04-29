/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface dataType {
  name?: string | undefined
  sector?: string | undefined
  agree?: boolean | undefined
}

const dataSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  sector: Yup.mixed().required('Sector is required'),
  agree: Yup.boolean().required('Please mark the checkbox is required'),
});

const initialValues = {
  name: '',
  sector: '',
  agree: false,
};

function Home() {
  const dummyData = {
    name: '',
    sector: '',
    agree: false,
  };

  const [data, setData] = useState<dataType>(dummyData);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsgs, setErrorMsgs] = useState<any>({});

  //   handle submit
  const handleSubmit = () => {
    if (data?.name === '') {
      setIsError(true);
      setErrorMsgs({ ...errorMsgs, name: 'Name is required' });
    }

    if (data?.sector === '') {
      setIsError(true);
      setErrorMsgs({ ...errorMsgs, sector: 'Sector is required' });
    }

    if (data?.agree === false) {
      setIsError(true);
      setErrorMsgs({ ...errorMsgs, agree: 'Please mark the checkbox' });
    }

    if (data?.name && data?.sector && data?.agree) {
      setIsError(false);
      setErrorMsgs({ ...errorMsgs, name: '' });
      console.log(data);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: dataSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log(values);
      //   setLoading(true);
      //   try {
      //     const { data: auth }: any = await login(values.email, values.password);
      //     saveAuth(auth);
      //     if (auth.api_token) {
      //       const { data: user } = await getUserByToken(auth.api_token);
      //       localStorage?.setItem('token',auth.api_token);
      //       setCurrentUser(user);
      //     } else {
      //       saveAuth(undefined);
      //       setStatus('The login details are incorrect');
      //       setSubmitting(false);
      //       setLoading(false);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     saveAuth(undefined);
      //     setStatus('The login details are incorrect');
      //     setSubmitting(false);
      //     setLoading(false);
      //   }
    },
  });

  //   clear session
  const handleClearSession = () => {
    localStorage.clear();
    setData(dummyData);
    formik.setFieldValue('name', '');
    formik.setFieldValue('sector', '');
    formik.setFieldValue('agree', false);
  };
  //   storing states data from session
  useEffect(() => {
    if (typeof window !== undefined) {
      setData({
        name: localStorage?.getItem('name')
          ? localStorage?.getItem('name')?.toString()
          : '',
        sector: localStorage?.getItem('sector')
          ? localStorage?.getItem('sector')?.toString()
          : '',
        agree: localStorage?.getItem('agree') === 'true' ? true : false,
      });
      console.log(data);
    }
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <div className="max-w-xl m-auto content-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border 
               rounded py-3 px-4 mb-3"
              //   {...formik.getFieldProps('name')}
              onChange={(e) => {
                setData({ ...data, name: e?.target?.value });
                localStorage.setItem('name', e?.target?.value as any);
                formik.setFieldValue('name', e?.target?.value as any);
                initialValues.name = e?.target?.value
                  ? e?.target?.value.toString()
                  : '';
              }}
              value={data?.name || ''}
              id="grid-first-name"
              type="text"
              placeholder="Enter your name"
            />

            {/* {formik.touched.name && formik.errors.name && (
              <p className="text-red-700 text-xs italic">
                {formik.errors.name}
              </p>
            )} */}
            {data.name === '' && (
              <p className="text-red-700 text-xs italic">Name is required</p>
            )}
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Sector
            </label>
            <select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              onChange={(e) => {
                setData({ ...data, sector: e?.target?.value });
                localStorage.setItem('sector', e?.target?.value as any);
                formik.setFieldValue('sector', e?.target?.value as any);
                initialValues.sector = e?.target?.value
                  ? e?.target?.value.toString()
                  : '';
              }}
              value={data?.sector || ''}
            >
              <option value={''}>Select Sector</option>
              <option value="1" disabled>
                Manufacturing
              </option>
              <option value="19">
                &nbsp;&nbsp;&nbsp;&nbsp;Construction materials
              </option>
              <option value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;Electronics and Optics
              </option>
              <option value="6" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Food and Beverage
              </option>
              <option value="342">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bakery &amp;
                confectionery products
              </option>
              <option value="43">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beverages
              </option>
              <option value="42">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fish &amp; fish
                products{' '}
              </option>
              <option value="40">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meat &amp; meat
                products
              </option>
              <option value="39">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Milk &amp; dairy
                products{' '}
              </option>
              <option value="437">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
              </option>
              <option value="378">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sweets &amp;
                snack food
              </option>
              <option value="13" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Furniture
              </option>
              <option value="389">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bathroom/sauna{' '}
              </option>
              <option value="385">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bedroom
              </option>
              <option value="390">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children’s room{' '}
              </option>
              <option value="98">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen{' '}
              </option>
              <option value="101">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Living room{' '}
              </option>
              <option value="392">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Office
              </option>
              <option value="394">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                (Furniture)
              </option>
              <option value="341">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor{' '}
              </option>
              <option value="99">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project
                furniture
              </option>
              <option value="12" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Machinery
              </option>
              <option value="94">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                components
              </option>
              <option value="91">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                equipment/tools
              </option>
              <option value="224">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manufacture of
                machinery{' '}
              </option>
              <option value="97" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maritime
              </option>
              <option value="271">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aluminium
                and steel workboats{' '}
              </option>
              <option value="269">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boat/Yacht
                building
              </option>
              <option value="230">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ship
                repair and conversion
              </option>
              <option value="93">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal structures
              </option>
              <option value="508">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
              </option>
              <option value="227">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repair and
                maintenance service
              </option>
              <option value="11" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Metalworking
              </option>
              <option value="67">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Construction of
                metal structures
              </option>
              <option value="263">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Houses and
                buildings
              </option>
              <option value="267">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal products
              </option>
              <option value="542" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal works
              </option>
              <option value="75">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CNC-machining
              </option>
              <option value="62">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgings,
                Fasteners{' '}
              </option>
              <option value="69">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gas,
                Plasma, Laser cutting
              </option>
              <option value="66">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIG,
                TIG, Aluminum welding
              </option>
              <option value="9" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Plastic and Rubber
              </option>
              <option value="54">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Packaging
              </option>
              <option value="556">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic goods
              </option>
              <option value="559" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic
                processing technology
              </option>
              <option value="55">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blowing
              </option>
              <option value="57">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Moulding
              </option>
              <option value="53">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastics
                welding and processing
              </option>
              <option value="560">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic profiles
              </option>
              <option value="5" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Printing{' '}
              </option>
              <option value="148">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertising
              </option>
              <option value="150">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book/Periodicals
                printing
              </option>
              <option value="145">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling and
                packaging printing
              </option>
              <option value="7" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Textile and Clothing
              </option>
              <option value="44">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clothing
              </option>
              <option value="45">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textile
              </option>
              <option value="8" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Wood
              </option>
              <option value="337">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other (Wood)
              </option>
              <option value="51">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden building
                materials
              </option>
              <option value="47">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden houses
              </option>
              <option value="3" disabled>
                Other
              </option>
              <option value="37">
                &nbsp;&nbsp;&nbsp;&nbsp;Creative industries
              </option>
              <option value="29">
                &nbsp;&nbsp;&nbsp;&nbsp;Energy technology
              </option>
              <option value="33">&nbsp;&nbsp;&nbsp;&nbsp;Environment</option>
              <option value="2" disabled>
                Service
              </option>
              <option value="25">
                &nbsp;&nbsp;&nbsp;&nbsp;Business services
              </option>
              <option value="35">&nbsp;&nbsp;&nbsp;&nbsp;Engineering</option>
              <option value="28" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Information Technology and
                Telecommunications
              </option>
              <option value="581">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data processing,
                Web portals, E-marketing
              </option>
              <option value="576">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programming,
                Consultancy
              </option>
              <option value="121">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software,
                Hardware
              </option>
              <option value="122">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telecommunications
              </option>
              <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;Tourism</option>
              <option value="141">
                &nbsp;&nbsp;&nbsp;&nbsp;Translation services
              </option>
              <option value="21" disabled>
                &nbsp;&nbsp;&nbsp;&nbsp;Transport and Logistics
              </option>
              <option value="111">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air
              </option>
              <option value="114">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rail
              </option>
              <option value="112">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Road
              </option>
              <option value="113">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Water
              </option>
            </select>

            {/* {formik.touched.sector && formik.errors.sector && (
              <p className="text-red-700 text-xs italic">
                {formik.errors.sector}
              </p>
            )} */}
            {data?.sector === '' && (
              <p className="text-red-700 text-xs italic">Sector is required</p>
            )}
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <input
              type="checkbox"
              value={data?.agree ? 1 : 0 || 0}
              checked={data?.agree || false}
              onChange={(e) => {
                setData({ ...data, agree: e?.target?.checked });
                localStorage.setItem('agree', e?.target?.checked as any);
              }}
              id="inline"
              className="mr-1"
            />{' '}
            Agree to terms
          </div>
        </div>
        {formik.touched.agree && formik.errors.agree ? (
          <p className="text-red-700 text-xs italic">{formik.errors.agree}</p>
        ) : (
          data.agree === false && (
            <p className="text-red-700 text-xs italic">
              Please mark the checkbox
            </p>
          )
        )}

        <div className="-mx-3 mb-6 mt-6">
          <div className="md:w-full px-3  md:flex flex-wrap  md:flex-nowrap">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2 mr-0 lg:mr-2 lg:mb-0"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClearSession}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Clear Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
