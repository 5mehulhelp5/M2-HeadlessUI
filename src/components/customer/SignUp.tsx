"use client";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { CreateCustomer } from "@/lib/magento/queries/customer";
import magentoGraphQl from "@/lib/magento/graphQl/magentoGraphQl";
import { useLoader } from "@/components/context/PageLoaderContext";
import { useNotification } from "@/components/context/NotificationContext";
import { useSignInDialog } from "@/components/context/SignInDialog";
export default function SignUp() {
  const { openDialog } = useSignInDialog();
  const { showLoader,hideLoader } = useLoader();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_subscribed: false, // Add is_subscribed to the form data
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { showNotification } = useNotification();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };
  async function createNewCustomer() {
    try {
      const response = await magentoGraphQl('', 'createCustomer', CreateCustomer, formData);
      return response?.data;
    } catch (e) {
      console.error('error : ', e);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      showLoader()
      const data = await createNewCustomer();
      hideLoader()
      showNotification('New User Successfully Create.', 'success', 3000);
      openDialog()

    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/customer/H_Heroside3_2_6_24.webp")',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-2 gap-x-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.firstname ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
          )}
        </div>

        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          <button
            className="absolute inset-y-0 right-0 pr-3 flex text-sm cursor-pointer"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* New is_subscribed checkbox */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              name="is_subscribed"
              checked={formData.is_subscribed}
              onChange={handleChange}
              className="mr-2"
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Create An Account
          </button>
        </div>
      </form>
    </div>
  );
}
