import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Ripple from "@/components/magicui/ripple";
import axios from "axios";
import { PlayerContext } from "@/Provider/PlayConext";

interface Login {
  email: string;
  password: string;
}

interface CreateUser {
  email: string;
  userName: string;
  password: string;
}
interface LoginResponse {
  message: string;
  data: any; // You can replace 'any' with a more specific type if you know the structure of 'data'
}

const Login = () => {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });

  const [createUser, setCreateUser] = useState<CreateUser>({
    email: "",
    userName: "",
    password: "",
  });

  const playerContext = useContext(PlayerContext);
  if (!playerContext) {
    throw new Error("Newsong must be used within a PlayerProvider");
  }
  const { loginFunc } = playerContext;

  const navigate = useNavigate();

  const loginHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const getLogin = async (): Promise<LoginResponse> => {
      const res = await axios.request<LoginResponse>({
        url: `${import.meta.env.VITE_BASE_API}/api/login`,
        method: "POST",
        data: login,
      });

      loginFunc(res.data.data);
      setTimeout(() => {
        navigate("/");
      }, 300);

      return res.data;
    };

    toast.promise(getLogin(), {
      loading: "Loading",
      success: (data) => `${data.message}`,
      error: "Failed to login",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  };
  const createHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios
        .request({
          url: `${import.meta.env.VITE_BASE_API}/api/register`,
          method: "POST",
          data: createUser,
        })
        .then((res) => {
          toast.success(res.data.message);
        });
    } catch (error) {
      toast.error("Failed to create user");
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center h-full overflow-hidden bg-black/90 relative">
        <Ripple />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#2A2929",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            },
          }}
        />
        <div className="z-10 flex items-center justify-center md:w-[500px] w-[90%] h-[400px] p-10 bg-gradient-to-b from-[#07070785] via-[#2c2b2b90]  to-[#07070785] rounded-2xl shadow-lg">
          <Tabs
            defaultValue="Login"
            className="md:w-[90%] h-[100%]  flex flex-col items-center "
          >
            <TabsList className="md:w-[80%] w-[100%]">
              <TabsTrigger value="Login" className="w-[50%]">
                Login
              </TabsTrigger>
              <TabsTrigger value="Create Account" className="w-[50%]">
                Create Account
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
              <form onSubmit={loginHandle}>
                <div className="flex flex-col gap-4 w-[300px]">
                  <Input
                    onChange={handleChange}
                    name="email"
                    value={login.email}
                    type="email"
                    placeholder="Enter your Username"
                    required
                    className="mt-5"
                  />
                  <Input
                    onChange={handleChange}
                    name="password"
                    value={login.password}
                    type="password"
                    required
                    placeholder="Enter your Password"
                  />
                  <Button type="submit" className="w-[full] mt-2">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="Create Account">
              <form onSubmit={createHandle}>
                <div className="flex flex-col gap-4 w-[300px] ">
                  <Input
                    onChange={handleChange2}
                    name="email"
                    value={createUser.email}
                    type="email"
                    placeholder="Enter your Email"
                    required
                    className="mt-5"
                  />

                  <Input
                    onChange={handleChange2}
                    name="userName"
                    value={createUser.userName}
                    type="text"
                    placeholder="Enter your Username"
                    required
                  />
                  <Input
                    onChange={handleChange2}
                    name="password"
                    value={createUser.password}
                    type="password"
                    required
                    placeholder="Enter your Password"
                  />
                  <Button type="submit" className="w-[full] mt-2">
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
