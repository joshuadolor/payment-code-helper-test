<template>
    <v-container fill-height>
        <v-row>
            <v-col>
                {{ breadCrumbs }}
                <CategorySelector
                    v-if="!category"
                    @selected="(v) => (category = v)"
                />
                <DescriptionSelector
                    v-if="!!category"
                    @selected="selectItem"
                    :showMessage="selected.length !== 0"
                    :items="currentDescriptionItems"
                    :level="level"
                />
            </v-col>
        </v-row>
        <PaymentCodeDialog :show="show" @close="reset">
            <div class="text-h3">
                {{ paymentCode }}
            </div>
            {{ breadCrumbs }}
        </PaymentCodeDialog>
    </v-container>
</template>

<script>
import {
    items as paymentCodes,
    // getLeaves,
    getParentNodes,
} from "@/helpers/payment-code";
import CategorySelector from "@/components/CategorySelector";
import DescriptionSelector from "@/components/DescriptionSelector";
import PaymentCodeDialog from "@/components/PaymentCodeDialog";

export default {
    name: "PaymentCodeSelector",
    components: {
        CategorySelector,
        DescriptionSelector,
        PaymentCodeDialog,
    },
    data() {
        return {
            paymentCodes,
            selected: [],
            category: null,
            level: null,
            show: false,
        };
    },
    methods: {
        selectItem(item) {
            this.selected.push(item);
        },
        reset() {
            this.show = false;
            this.selected = [];
            this.category = null;
            this.level = null;
        },
    },
    watch: {
        lastSelected(val) {
            if (val) {
                this.level = val.level - 1;
            }
        },
        level(val) {
            if (val < 0 && val !== null) {
                this.show = true;
            }
        },
    },
    computed: {
        breadCrumbs() {
            const display = [
                this.category,
                ...[...this.selected]
                    .reverse()
                    .map((item) => `${item.name} (${item.code})`),
            ];
            return display.join(" > ");
        },
        showPaymentCode() {
            return !!this.category && this.code.length > 0;
        },
        paymentCode() {
            // format 101-01
            const codes = this.selected.map((item) => item.code);

            const code = codes.pop() || "000";
            const subcode = codes.pop() || "00";

            return `${code}-${subcode}`;
        },
        filteredPaymentCodes() {
            return this.paymentCodes.filter((item) => {
                return item.category === this.category;
            });
        },
        lastSelected() {
            return this.selected[this.selected.length - 1];
        },
        currentDescriptionItems() {
            return getParentNodes(this.filteredPaymentCodes, this.lastSelected);
        },
    },
    mounted() {},
};
</script>
