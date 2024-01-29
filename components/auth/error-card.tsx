import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import BackButton from "./back-button";
import Header from "./header";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="text-center">
        <Header label={"Something went wrong!"}/>
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Back to login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
