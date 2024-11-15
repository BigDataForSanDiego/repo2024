//
//  ListView.swift
//  pp
//
//  Created by Matthew Tran on 10/14/24.
//

import SwiftUI
    //please

    struct ListView: View {
        @State var newItem: String =   ""
        @State var buttonColor: Color = Color.green
        
        @State var items: [String] = [
            "Medicine added 1",
            "Medicine added 2",
            "testing new branch"
        ]
        var body: some View {
           
            //store sentence values of todo list

         

            VStack{
                HStack{
                    AddMedication(textFieldText: $newItem)
                    Button(action: {
                        buttonColor = (buttonColor == Color.blue) ? Color.green : Color.blue
                        if(!newItem.isEmpty){
                            items.append(newItem)
                        }
                        }, label: {
                    Label("", systemImage: "arrowshape.up.circle.fill")
                            .cornerRadius(10)
                            .foregroundColor(buttonColor)
                            .font(.largeTitle)
                            .dynamicTypeSize(.xxxLarge)
                        })
                }
                //items.append(newItem) (Items may need to be moved into AddMedication
                //call to addmedication file
                
                    List {
                        //iterate through items array
                        ForEach(items, id: \.self){ item in
                            ListRowView(title: item)
                        }
                        .listStyle(PlainListStyle())
                    }
                //title
                .navigationTitle("Prescription Pals 💊")
            }
        }
    }

    
    struct ListView_Previews: PreviewProvider{
        static var previews: some View {
            NavigationView{
                ListView()
            }
        }
    }



