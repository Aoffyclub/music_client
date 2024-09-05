import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Login {
  username: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState<Login>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(login);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="flex justify-center items-center h-full bg-gradient-to-b from-[#070707] via-[#2c2b2b]  to-[#070707]">
        <div className="flex items-center justify-center w-[500px] h-[400px] p-10 bg-[#444242] rounded-md shadow-md">
          <Tabs
            defaultValue="Login"
            className="w-[90%] h-[90%]  flex flex-col items-center "
          >
            <TabsList className="w-[80%]">
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
                    name="username"
                    value={login.username}
                    type="text"
                    placeholder="Enter your name"
                    className="mt-5"
                  />
                  <Input
                    onChange={handleChange}
                    name="password"
                    value={login.password}
                    type="password"
                    placeholder="Enter your password"
                  />
                  <Button type="submit" className="w-[full]">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="Create Account">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
