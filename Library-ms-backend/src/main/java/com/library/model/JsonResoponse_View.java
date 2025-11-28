package com.library.model;

 

public class JsonResoponse_View {
    // BasicView: Controls the fields that will be serialized in basic responses
    public static class BasicView {}

    // DetailedView: Controls the fields that will be serialized in detailed responses (Optional)
    public static class DetailedView extends BasicView {}
}
