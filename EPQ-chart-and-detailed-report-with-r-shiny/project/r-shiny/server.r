# Importing libraries.
  library(shiny)
  library(SCperf)

  # Shiny server that receives input, output and session values.
    shinyServer(function(input,output,session){
  # Listening to the click event where "$click" is the id of the button.
      observeEvent(input$click,{

        # Values that arrive from Javascript. You can see them through the server console.
          print(input$click)

        # Values from the EPQ model:  Demand, Production, k and h 😷.
          demand <- input$click$demand
          production <- input$click$production
          k <- input$click$k
          h <- input$click$h
          business <- input$click$ business
        # I send the values to build the model.
          EPQPROBLEM <- EPQ(d = demand, p = production, k = k, h=h)
        # I check that the conditions are met in order to use this model ✔.
       
        # Extracting the values.
          # [Values that will be sent to Javascript]
            # order quantity.
              q <- EPQPROBLEM[[0]]
            # Time required to produce the batch quantity.
              ti <- EPQPROBLEM[[1]]
            # Time between orders (cycle length or time).
              Tie <- EPQPROBLEM[[2]]
            # Maximum inventory level.
              In <- EPQPROBLEM[[3]]
            # Total cost
              TCs <- EPQPROBLEM[[4]]
            
             

          # I create a list that will save all the previous values to send them to Javascript and it receives them as a vector.
          
            info <- list(q,ti,Tie,In,TCs)

          # I send the values to Javascript.
          session$sendCustomMessage("handler_stable_state_chart", info)
      })
    })
