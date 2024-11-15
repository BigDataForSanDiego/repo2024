"use client";
import Doctor from "@/features/doctor/components/doctor";
import { DoctorInfo } from "@/features/doctor/types/types";
import Question from "@/features/question/components/question";
import XML from "@/features/question/components/xml";

const doctorSample: DoctorInfo = {
  name: "Jonathan Koelle, MD",
  imagePath: "doctor-placeholder.png",
  specialty: "Psychiatry",
  distance: "2.8 miles",
  location: "La Mesa",
  accepting_new_patients: true,
  appointments_available: true,
  visit_options: ["In-person", "Virtual"],
};
export default function Dev() {
  return (
    <div>
      <XML></XML>
      <Doctor
        name={doctorSample.name}
        specialty={doctorSample.specialty}
        distance={doctorSample.distance}
        location={doctorSample.location}
        accepting_new_patients={doctorSample.accepting_new_patients}
        appointments_available={doctorSample.appointments_available}
        visit_options={doctorSample.visit_options}
        imagePath={doctorSample.imagePath}
      ></Doctor>
    </div>
  );
}
