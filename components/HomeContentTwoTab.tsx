import HowToInstructionItem from "@/app/components/HowToInstructionItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeContentTwoTab = () => {
  return (
    <Tabs defaultValue="host">
      <TabsList className="grid h-12 w-full grid-cols-2 bg-indigo-300">
        <TabsTrigger value="host" className="font-bold">
          Host
        </TabsTrigger>
        <TabsTrigger value="guest" className="font-bold">
          Guest
        </TabsTrigger>
      </TabsList>
      <TabsContent value="host" className="mt-6">
        <div className="text-white">
          <div className="flex flex-col gap-7 text-white">
            <HowToInstructionItem
              number={"1"}
              title={"Download the App and Sign Up"}
              description={
                "Easy and fast verification to get access to the CARRO car sharing community"
              }
            />
            <HowToInstructionItem
              number={"2"}
              title={"Share your car"}
              description={"Upload basic details of your car to start sharing."}
            />
            <HowToInstructionItem
              number={"3"}
              title={"Personalise sharing preferences"}
              description={
                "Customise your car's availability, delivery options, and etc."
              }
            />
            <HowToInstructionItem
              number={"4"}
              title={"Sit back and start earning"}
              description={
                "Earn extra income and make your car pay for itself."
              }
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="guest" className="mt-6">
        <div className="flex flex-col gap-7 text-white">
          <HowToInstructionItem
            number={"1"}
            title={"Download the App and Sign Up"}
            description={
              "Easy and fast verification to get access to the CARRO car sharing community"
            }
          />
          <HowToInstructionItem
            number={"2"}
            title={"Find the car of your choice"}
            description={"Search and book the car you desire"}
          />
          <HowToInstructionItem
            number={"3"}
            title={"Get the car"}
            description={"Meet the Host or have it delivered to you"}
          />
          <HowToInstructionItem
            number={"4"}
            title={"CARRO safe and have fun!"}
            description={
              "Cruise to your dreams in style under CARRO's protetion"
            }
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HomeContentTwoTab;
