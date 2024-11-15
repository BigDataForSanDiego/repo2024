//
//  ListView.swift
//  pp
//
//  Created by Matthew Tran on 10/14/24.
//

import SwiftUI
    
struct ListView: View {
    var body: some View {
        
        //store sentence values of todo list
        @State var items: [String] = [
            "Medicine added 1",
            "Medicine added 2",
            "testing new branch"
        ]
        VStack{
            
            //call to addmedication file
            AddMedication()
            
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


