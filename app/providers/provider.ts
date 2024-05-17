import { RatioResult } from "@/types/ratioResult";

export default class RatioProvider {
    private storageName: string;

    constructor() {
        this.storageName = "coffeRatios";
        this.parseData();
    }

    private parseData() {
        for (const ratio of this.getAll()) {
            ratio.id = crypto.randomUUID()
        }
    }

    public getAll(): RatioResult[] {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem(this.storageName)!) ?? []
        } else {
            return []
        }
    }

    public add(ratio: RatioResult) {
        const ratios = this.getAll();
        ratios.push(ratio);
        this.save(ratios);
    }

    private save(ratios: RatioResult[]) {
        localStorage.setItem(this.storageName, JSON.stringify(ratios));
        window.dispatchEvent(new Event("storageUpdate"));
    }
}
