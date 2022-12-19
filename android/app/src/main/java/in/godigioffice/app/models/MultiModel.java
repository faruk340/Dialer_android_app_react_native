package in.godigioffice.app.models;

import java.io.Serializable;

public class MultiModel implements Serializable {
    private boolean isChecked = false;

    private  String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public void setChecked(boolean checked) {
        isChecked = checked;
    }

}
