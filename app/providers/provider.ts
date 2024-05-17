import { RatioResult } from "@/types/ratioResult";

export default class RatioProvider {
    private storageName: string;

    constructor() {
        this.storageName = "coffeRatios";
        this.parseData();
    }

    private parseData() {
        for (const ratio of this.getAll()) {
            ratio.id = crypto.randomUUID();
        }
    }

    public getAll(): RatioResult[] {
        if (typeof window !== "undefined") {
            const ratios: RatioResult[] = JSON.parse(localStorage.getItem(this.storageName)!) ?? [];
            return ratios.sort((ratioA, ratioB) => ratioA.date > ratioB.date ? 0 : 1)
        } else {
            return [];
        }
    }

    public add(ratio: RatioResult) {
        const ratios = this.getAll();
        ratios.push(ratio);
        this.save(ratios);
    }

    public delete(id: string) {
        const ratios = this.getAll();
        const index = ratios.findIndex((ratio) => ratio.id === id);
        ratios.splice(index, 1)
        this.save(ratios);
        this.launchUpdateEvent()
    }

    private save(ratios: RatioResult[]) {
        localStorage.setItem(this.storageName, JSON.stringify(ratios));
        this.launchUpdateEvent()
    }

    private launchUpdateEvent() {
        window.dispatchEvent(new Event("storageUpdate"));
    }
}
