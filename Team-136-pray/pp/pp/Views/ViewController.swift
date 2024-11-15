import UIKit
import Foundation
////import PlaygroundSupport
//
//// Allows playground to continue running while the async task is executed
////PlaygroundPage.current.needsIndefiniteExecution = true
//
//// Struct to match the expected JSON response from OpenFDA
//struct DrugLabel: Codable {
//    let id: String
//    let dosage_and_administration: [String]?
//    let description: [String]?
//}
//
//struct FDAResponse: Codable {
//    let results: [DrugLabel]
//}
//
//// Function to fetch drug data from OpenFDA API
//func getDrugData() {
//    let urlString = "https://api.fda.gov/drug/label.json?search=openfda.brand_name:advil&limit=1"
//    guard let url = URL(string: urlString) else {
//        print("Invalid URL")
//        return
//    }
//
//    var request = URLRequest(url: url)
//    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//
//    let task = URLSession.shared.dataTask(with: request) { data, response, error in
//        if let error = error {
//            print("Error fetching data:", error)
//            return
//        }
//
//        guard let data = data else {
//            print("No data returned")
//            return
//        }
//
//        do {
//            // Decode the response to FDAResponse, which contains an array of DrugLabel
//            let jsonResponse = try JSONDecoder().decode(FDAResponse.self, from: data)
//            let drugLabels = jsonResponse.results
//
//            // Iterate over the results
//            for label in drugLabels {
//                print("ID:", label.id)
//                print("Dosage:", label.dosage_and_administration ?? ["No data"])
//                print("Description:", label.id ?? ["No description available"])
//            }
//        } catch let jsonError {
//            print("Failed to decode JSON:", jsonError)
//        }
//    }
//
//    task.resume()
//}
//
//
