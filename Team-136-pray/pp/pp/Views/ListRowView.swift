//
//  ListRowView.swift
//  pp
//
//  Created by Matthew Tran on 10/14/24.
//

import SwiftUI

struct ListRowView: View {
    //makes title dynamic
    let title: String
    @State var buttonImage: String = "checkmark.circle"
    

    var body: some View {
        
        HStack{
            Button(action:{
                buttonImage = (buttonImage == "checkmark.circle") ? "checkmark.circle.fill" : "checkmark.circle"
            },label: {
                Label("", systemImage: buttonImage)
                    })
            Text(title)
            Spacer()
            Image(systemName: ("minus"))
                
            
        }
    }
}

#Preview {
    
    ListRowView(title: "This is the first title")
}
