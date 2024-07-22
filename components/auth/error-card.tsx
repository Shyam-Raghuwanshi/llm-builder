import { TbAlertTriangleFilled } from "react-icons/tb";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
export const ErrorCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Oops! Something went wrong!
        </CardTitle>
      </CardHeader>
    <CardFooter>
      <div className="w-full flex justify-center items-center">
        <TbAlertTriangleFilled className="text-destructive" />
        <span className="hover:underline space-x-2">Back to login</span>
      </div>
      </CardFooter>
    </Card>
  );
};