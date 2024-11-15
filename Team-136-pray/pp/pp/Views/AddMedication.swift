//
//  AddMedication.swift
//  pp
//
//  Created by Matthew Tran on 10/14/24.
//

import SwiftUI

struct AddMedication: View {
    
    //Textfield
    @Binding var textFieldText: String
       
    
    func addMed() -> String{
        return textFieldText
    }
    
        var body: some View {
            let color = #colorLiteral(red: 0.8039215803, green: 0.8039215803, blue: 0.8039215803, alpha: 1)
        //prompt user to input information
        

            //TODO: put the button next to the text field and add this file to ListView
             HStack {
                TextField("Add Medication", text: $textFieldText)
                    .padding(.leading, 15.0)
                    
                    //makes text field taller
                    .frame(height:55)
                    //background color of text field
                    .background(Color(color))
                    //makes it round
                    .cornerRadius(2)                
               
            }
             .padding()
    }
}

struct AddMedication_Previews: PreviewProvider{
    static var previews: some View {
        NavigationView{
            AddMedication(textFieldText: .constant(""))
        }
    }
}
