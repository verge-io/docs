# Tracking Network Statistics

Statistics tracking can be enabled for *Accept, Drop, Reject* and *Translate* rules. This allows viewing the total number of packets/bytes processed by a rule. Currently, statistics cannot be tracked for *Route* rules.

## Enable Statistics Tracking for All Non-routing Rules of a Network

!!! info "Requires a restart of the network."

1. From the network dashboard, click **Edit** on the left menu.
2. Check the **Track Statistics For All Rules** checkbox.
3. Click **Submit**.
4. Click **Restart** on the left menu to reset and apply the change. A typical restart will cause a momentary disruption.

See directions below for viewing the tracked statistics.

## Enable Statistics Tracking for Individual Rules

1. From the network dashboard, click **Rules** on the left menu.
2. Double-click the desired rule.
3. Check the **Track Rule Statistics** checkbox.
4. Click **Submit**.
5. Click **Apply Rules** on the left menu.

See directions below for viewing the tracked statistics.

## Reset Counter/Clear Statistics for an Individual Rule

1. From the network dashboard, click **Rules** on the left menu.
2. Click the desired rule to select.
3. Verify the desired rule is selected (checkbox on the left will be checked).
4. Click **Clear Statistics** on the left menu. Packets/Bytes counters for this rule will restart again from zero.

## Display Rule Statistics

1. From the network dashboard, click **Rules** on the left menu.
2. Right-click on the columns heading section at the top.
3. Check the boxes for **Packets** and/or **Bytes** to display these columns.

![Show Statistics](/product-guide/screenshots/trackstats-cols.png)

!!! success "Enabling the Statistics column will show if statistics tracking is enabled for each rule."
