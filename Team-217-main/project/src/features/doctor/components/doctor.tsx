import { DoctorInfo } from "../types/types";

export default function Doctor({
  name,
  imagePath,
  specialty,
  distance,
  location,
  accepting_new_patients,
  appointments_available,
  visit_options,
}: DoctorInfo) {
  return (
    <div className="flex flex-row items-center">
      <img className="w-16 h-16 rounded-full" src={imagePath} alt="icon" />
      <span className=" font-semibold ml-2"> {name} </span>
    </div>
  );
}
