package it.finsoft.entity;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.bind.adapter.JsonbAdapter;

/**
 *
 * 
 */

public class FlussoAdapter implements JsonbAdapter<Flusso,JsonObject>{

    @Override
    public JsonObject adaptToJson(Flusso sede) throws Exception {
        return Json.createObjectBuilder()
                .add("id",sede.getId())
                .add("tabella", sede.getTabella())
                .build();
    }

    @Override
    public Flusso adaptFromJson(JsonObject o) throws Exception {
        return new Flusso(
            o.getInt("id"),
            o.getString("tabella"));
    }
    
}