export default {
    settleDebts(holes, payout, players) {
        let buyIn = Math.round(100 * holes.length * payout / players.length) / 100
        for (let i = 0; i < players.length; i++) {
            players[i].won = this.wonSkins(players[i].id, holes) * payout - buyIn;
        }

        for (let i = (players.length - 1); i >= 0; i--) {
            if (players[i].won == 0) {
                players = this.removePlayer(players, players[i].id)
            }
        }

        let payments = []
        while (players.length > 0) {
            let retval = this.removeDuplicates(players, payments)
            players = retval[0]
            payments = retval[1]

            if (players.length === 0) {
                break
            }

            retval = this.paySmallest(players)
            players = retval[0]
            payments.push(retval[1])
        }

        return payments.sort(function (a, b) {
            return b[0] - a[0];
        })
    },
    wonSkins(playerId, holes) {
        let won = 0;
        let skinsOnTheLine = 1;
        for (let i = 0; i < holes.length; i++) {
            if (holes[i].pushed) {
                skinsOnTheLine++
            }

            if (holes[i].winner === playerId) {
                won += skinsOnTheLine
            }
            if (!holes[i].pushed) {
                skinsOnTheLine = 1
            }
        }
        return won
    },
    removeDuplicates(players, payments) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            let payment = this.payDuplicates(players)
            if (!payment) {
                break
            }
            payments.push(payment)
            players = this.removePlayer(players, payment.from)
            players = this.removePlayer(players, payment.to)
        }
        return [players, payments]
    },
    payDuplicates(players) {
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players.length; j++) {
                if (players[i].won < 0 && players[j].won > 0 && players[i].won + players[j].won == 0) {
                    return {
                        from: players[i].id,
                        to: players[j].id,
                        amount: Math.abs(players[i].won)
                    }
                }
            }
        }
        return false
    },
    paySmallest(players) {
        let maxDebt = 1
        let minOwed = 100000
        let maxDebtIndex = 0
        let minOwedIndex = 0
        for (let i = 0; i < players.length; i++) {
            if (players[i].won < maxDebt && players[i].won < 0) {
                maxDebt = players[i].won
                maxDebtIndex = i
            }
            if (players[i].won < minOwed && players[i].won > 0) {
                minOwed = players[i].won
                minOwedIndex = i
            }
        }
        if (Math.abs(maxDebt) > Math.abs(minOwed)) {
            players[maxDebtIndex].won = maxDebt + minOwed
            let transaction = {
                from: players[maxDebtIndex].id,
                to: players[minOwedIndex].id,
                amount: Math.abs(minOwed)
            }
            players = this.removePlayer(players, players[minOwedIndex].id)
            return [players, transaction]
        }
        if (Math.abs(maxDebt) < Math.abs(minOwed)) {
            players[minOwedIndex].won = maxDebt + minOwed
            let transaction = {
                from: players[maxDebtIndex].id,
                to: players[minOwedIndex].id,
                amount: Math.abs(maxDebt)
            }
            players = this.removePlayer(players, players[maxDebtIndex].id)
            return [players, transaction]
        }
    },
    removePlayer(players, playerId) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === playerId) {
                players.splice(i, 1)
            }
        }
        return players
    }
}