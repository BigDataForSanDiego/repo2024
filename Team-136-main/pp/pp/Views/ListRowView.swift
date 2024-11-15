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
    
    var body: some View {
        HStack{
            Image(systemName: ("checkmark.circle"))
            Text(title)
            Spacer()
        }
    }
}

#Preview {
    
    ListRowView(title: "This is the first title")
}
