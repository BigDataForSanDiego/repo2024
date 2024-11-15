//
//  AddMedication.swift
//  pp
//
//  Created by Matthew Tran on 10/14/24.
//

import SwiftUI

struct AddMedication: View {
    var body: some View {
        //Textfield
        @State var textFieldText: String = ""
        let color = #colorLiteral(red: 0.8039215803, green: 0.8039215803, blue: 0.8039215803, alpha: 1)
        //prompt user to input information
        
            //TODO: put the button next to the text field and add this file to ListView
            HStack {
                TextField("Add Medication", text: $textFieldText)
                    //makes text field taller
                    .frame(height:55)
                    //background color of text field
                    .background(Color(color))
                    //makes it round
                    .cornerRadius(10)
                    
                
                Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/, label: {
                    Label("", systemImage: "arrowshape.up.circle.fill")
                        .cornerRadius(10)
                        .font(.largeTitle)
                        .dynamicTypeSize(.xxxLarge)
                })
            }
            .padding()
                
        
    }
}

struct AddMedication_Previews: PreviewProvider{
    static var previews: some View {
        NavigationView{
            AddMedication()
        }
    }
}
